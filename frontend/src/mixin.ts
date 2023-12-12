/* 表示具有各种属性的照片 */
export interface Photo {
    /** 照片的标识号 */
    id: number
    /** 照片的实际宽度（以像素为单位） */
    width: number
    /** 照片的实际高度（以像素为单位） */
    height: number
    /** 存放照片的 Pexels URL */
    url: string
    /** 拍摄照片的摄影师的姓名 */
    photographer: string
    /** 拍摄照片的摄影师的 Pexels 个人资料 URL */
    photographerUrl: string
    /** 摄影师的标识号 */
    photographerId: number
    /** 照片的平均颜色在图像加载时用作占位符 */
    avgColor: string
    /** 表示照片是否被喜欢 */
    liked: string
    /** 用于 alt 属性的照片的文本描述 */
    alt: string
    /** 用于显示此照片的不同图像大小的集合 */
    src: Record<keyof typeof srcDesc, string>
}

export const getPhotos = (page: number = 0, pageSize: number = 36) => {
    return new Promise<{
        photos: Photo[],
        page: number,
        pageSize: number
    }>(resolve => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('pageSize', pageSize.toString())
        fetch('/api/photos?' + params.toString()).then(res => {
            res.json().then(photos => {
                resolve({ photos, page, pageSize })
            })
        })
    })
}

/** 图片文件类型描述 */
export const srcDesc = {
    original: '原始图片',
    large2x: '宽 940px 高 650px DPR 2',
    large: '宽 940px 高 650px DPR 1',
    medium: '等比例缩放，高 350px',
    small: '等比例缩放，高 130px',
    portrait: '宽 800px 高 1200px',
    landscape: '宽 1200px 高 627px',
    tiny: '宽 280px 高 200px'
}

/** 获取翻页器数据组合，-1 表示省略，0 表示隐藏 */
export const loadPage = (page: number, total: number) => {
    /*
    1. 总页码 > 7 时，前 4 页的排列相同，后 4 页的排列相同
        前4页：[1] [2] [3] [4] [5] ... [-1]
        中间：[1] ... [p-1] [p] [p+1] ... [-1]
        后4页：[1] ... [-5] [-4] [-3] [-2] [-1]
    2. 总页码 <= 7 时，只有 1 种排列
    */
    type Page = number
    const pages: Page[] = []
    if (total > 7) {
        if (page < 5) {
            pages.push(...[1, 2, 3, 4, 5, -1, total])
        } else if (total - page < 4) {
            pages.push(...[1, -1, total - 4, total - 3, total - 2, total - 1, total])
        } else {
            pages.push(...[1, -1, page - 1, page, page + 1, -1, total])
        }
    } else {
        for (let i = 0; i < 7; i++)
            pages.push(i + 1)
    }
    return {
        prev: page <= 1 ? 0 : page - 1,
        next: page >= total ? 0 : page + 1,
        pages
    }
}