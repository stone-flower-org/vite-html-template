import { Plugin } from 'vite';

export type HTMLTemplateDefine = Record<string, string | number | null | undefined>;

export interface HTMLTemplateOptions {
  define: HTMLTemplateDefine;
  interpolate: RegExp;
}

export const DEFAULT_OPTIONS = {
  define: {},
  interpolate: /\${(\s*\w+\s*)}/gi,
};

function inject(source: string, define: HTMLTemplateDefine, interpolate: RegExp) {
  const matches = source.matchAll(interpolate);
  [...matches].forEach((match) => {
    if (!(match[1] in define)) return;
    source = source.replaceAll(match[0], String(define[match[1]]));
  });
  return source;
}

export default (options: Partial<HTMLTemplateOptions> = {}) => {
  const pluginOptions = Object.assign(DEFAULT_OPTIONS, options);
  return [
    {
      name: 'html-template:pre',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          const { define, interpolate } = pluginOptions;
          return inject(html, define, interpolate);
        },
      },
    } satisfies Plugin,
    {
      name: 'html-template:post',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          const scripts = html.match(/(<script[^<]*><\/script>)/g) || [];
          scripts.forEach((script) => {
            html = html.replace(script, '');
            html = html.replace('</body>', `${script}</body>`);
          });
          return html;
        },
      },
    } satisfies Plugin,
  ];
};
