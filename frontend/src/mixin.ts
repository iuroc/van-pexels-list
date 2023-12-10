/* 表示具有各种属性的照片 */
export interface Photo {
    /** 照片的标识号 */
    id: number;
    /** 照片的实际宽度（以像素为单位） */
    width: number;
    /** 照片的实际高度（以像素为单位） */
    height: number;
    /** 存放照片的 Pexels URL */
    url: string;
    /** 拍摄照片的摄影师的姓名 */
    photographer: string;
    /** 拍摄照片的摄影师的 Pexels 个人资料 URL */
    photographerUrl: string;
    /** 摄影师的标识号 */
    photographerId: number;
    /** 照片的平均颜色在图像加载时用作占位符 */
    avgColor: string;
    /** 表示照片是否被喜欢 */
    liked: string;
    /** 用于 alt 属性的照片的文本描述 */
    alt: string;
    /** 用于显示此照片的不同图像大小的集合 */
    src: SrcType;
}

/* 表示用于显示照片的不同图像大小 */
export interface SrcType {
    /** 没有任何大小更改的图像与宽度和高度属性相同 */
    original: string;
    /** 调整为 W 940px X H 650px DPR 1 的图像 */
    large2x: string;
    /** 调整为 W 940px X H 650px DPR 2 的图像 */
    large: string;
    /** 等比例缩放，使其新高度为 350px 的图像 */
    medium: string;
    /** 等比例缩放，使其新高度为 130px 的图像 */
    small: string;
    /** 裁剪为 W 800px X H 1200px 的图像 */
    portrait: string;
    /** 裁剪为 W 1200px X H 627px 的图像 */
    landscape: string;
    /** 裁剪为 W 280px X H 200px 的图像 */
    tiny: string;
}