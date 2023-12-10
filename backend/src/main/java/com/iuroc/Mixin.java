package com.iuroc;

/* 表示具有各种属性的照片 */
class Photo {
    /** 照片的标识号 */
    public int id;
    /** 照片的实际宽度（以像素为单位） */
    public int width;
    /** 照片的实际高度（以像素为单位） */
    public int height;
    /** 存放照片的 Pexels URL */
    public String url;
    /** 拍摄照片的摄影师的姓名 */
    public String photographer;
    /** 拍摄照片的摄影师的 Pexels 个人资料 URL */
    public String photographerUrl;
    /** 摄影师的标识号 */
    public int photographerId;
    /** 照片的平均颜色在图像加载时用作占位符 */
    public String avgColor;
    /** 表示照片是否被喜欢 */
    public String liked;
    /** 用于 alt 属性的照片的文本描述 */
    public String alt;
    /** 用于显示此照片的不同图像大小的集合 */
    public SrcType src;
}

/* 表示用于显示照片的不同图像大小 */
class SrcType {
    /** 没有任何大小更改的图像与宽度和高度属性相同 */
    public String original;
    /** 调整为 W 940px X H 650px DPR 1 的图像 */
    public String large2x;
    /** 调整为 W 940px X H 650px DPR 2 的图像 */
    public String large;
    /** 等比例缩放，使其新高度为 350px 的图像 */
    public String medium;
    /** 等比例缩放，使其新高度为 130px 的图像 */
    public String small;
    /** 裁剪为 W 800px X H 1200px 的图像 */
    public String portrait;
    /** 裁剪为 W 1200px X H 627px 的图像 */
    public String landscape;
    /** 裁剪为 W 280px X H 200px 的图像 */
    public String tiny;
}