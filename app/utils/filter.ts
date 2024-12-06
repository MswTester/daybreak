import * as PIXIFilters from 'pixi-filters';
import * as PIXI from 'pixi.js';

const toFilter = (key:FilterName|string, option?:any):PIXI.Filter => {
    switch(key){
        case 'AdjustmentFilter':
            return new PIXIFilters.AdjustmentFilter(option);
        case 'AdvancedBloomFilter':
            return new PIXIFilters.AdvancedBloomFilter(option);
        case 'AsciiFilter':
            return new PIXIFilters.AsciiFilter(option);
        case 'BevelFilter':
            return new PIXIFilters.BevelFilter(option);
        case 'BloomFilter':
            return new PIXIFilters.BloomFilter(option);
        case 'BlurFilter':
            return new PIXI.BlurFilter(option);
        case 'BulgePinchFilter':
            return new PIXIFilters.BulgePinchFilter(option);
        case 'ColorMapFilter':
            return new PIXIFilters.ColorMapFilter(option);
        case 'ColorOverlayFilter':
            return new PIXIFilters.ColorOverlayFilter(option);
        case 'ColorReplaceFilter':
            return new PIXIFilters.ColorReplaceFilter(option);
        case 'ConvolutionFilter':
            return new PIXIFilters.ConvolutionFilter(option);
        case 'CrossHatchFilter':
            return new PIXIFilters.CrossHatchFilter();
        case 'CRTFilter':
            return new PIXIFilters.CRTFilter(option);
        case 'DisplacementFilter':
            return new PIXI.DisplacementFilter(option);
        case 'DotFilter':
            return new PIXIFilters.DotFilter(option);
        case 'DropShadowFilter':
            return new PIXIFilters.DropShadowFilter(option);
        case 'EmbossFilter':
            return new PIXIFilters.EmbossFilter(option);
        case 'GlitchFilter':
            return new PIXIFilters.GlitchFilter(option);
        case 'GlowFilter':
            return new PIXIFilters.GlowFilter(option);
        case 'GodrayFilter':
            return new PIXIFilters.GodrayFilter(option);
        case 'GrayscaleFilter':
            return new PIXIFilters.GrayscaleFilter();
        case 'HslAdjustmentFilter':
            return new PIXIFilters.HslAdjustmentFilter(option);
        case 'KawaseBlurFilter':
            return new PIXIFilters.KawaseBlurFilter(option);
        case 'MotionBlurFilter':
            return new PIXIFilters.MotionBlurFilter(option);
        case 'OldFilmFilter':
            return new PIXIFilters.OldFilmFilter(option);
        case 'OutlineFilter':
            return new PIXIFilters.OutlineFilter(option);
        case 'PixelateFilter':
            return new PIXIFilters.PixelateFilter(option);
        case 'RadialBlurFilter':
            return new PIXIFilters.RadialBlurFilter(option);
        case 'ReflectionFilter':
            return new PIXIFilters.ReflectionFilter(option);
        case 'RGBSplitFilter':
            return new PIXIFilters.RGBSplitFilter(option);
        case 'ShockwaveFilter':
            return new PIXIFilters.ShockwaveFilter(option);
        case 'SimpleLightmapFilter':
            return new PIXIFilters.SimpleLightmapFilter(option);
        case 'TiltShiftFilter':
            return new PIXIFilters.TiltShiftFilter(option);
        case 'TwistFilter':
            return new PIXIFilters.TwistFilter(option);
        case 'ZoomBlurFilter':
            return new PIXIFilters.ZoomBlurFilter(option);
        default:
            return new PIXI.Filter(option);
    }
}

export { toFilter }