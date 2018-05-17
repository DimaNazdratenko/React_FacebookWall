// Presets
import { source } from '../paths';

// Plugins
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// PostCSS
import imports from 'postcss-import';
import url from 'postcss-url';
import cssnext from 'postcss-cssnext';
import properties from 'postcss-custom-properties';
import mqpacker from 'css-mqpacker';
import smootheFonts from 'postcss-font-smoothing';
import modules from 'postcss-icss-selectors';
import reporter from 'postcss-reporter';
import gradients from 'postcss-easing-gradients';
import cssnano from 'cssnano';

export const loadPostCSS = () => ({
    loader:  'postcss-loader',
    options: {
        ident:   'postcss',
        plugins: (loader) => {
            return [
                imports({
                    getPath:        source,
                    skipDuplicates: true,
                }),
                url({
                    basePath: source,
                }),
                modules({
                    mode: loader.resourcePath.includes('.m.css')
                        ? 'local'
                        : 'global',
                }),
                gradients(),
                properties(),
                smootheFonts(),
                cssnext({
                    features: {
                        autoprefixer:     true,
                        customProperties: false,
                        applyRule:        false,
                        customMedia:      {
                            extensions: {
                                '--phonePortrait':   '(width <= 414px)',
                                '--phoneLandscape':  '(width >= 415px) and (width <= 667px)',
                                '--tabletPortrait':  '(width >= 668px) and (width <= 768px)',
                                '--tabletLandscape': '(width >= 769px) and (width <= 1024px)',
                                '--desktopS':        '(width >= 1025px) and (width <= 1366px)',
                                '--desktopM':        '(width >= 1367px) and (width <= 1680px)',
                                '--desktopL':        '(width >= 1681px) and (width <= 1920px)',
                                '--desktopXL':       '(width >= 1921px)',
                            },
                        },
                    },
                }),
                mqpacker(),
                reporter(),
                cssnano()
            ];
        },
        sourceMap: true,
    },
});

export const generateSourceMaps = ({ devtool }) => ({
    devtool,
});

export const createBuildAnalyzer = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            generateStatsFile: true,
            statsFilename:     'build-stats.json',
            openAnalyzer:      false,
        })
    ],
});
