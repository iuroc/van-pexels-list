/// <reference types="vite/client" />
import van, { State } from 'vanjs-core'
import { Photo, getPhotos, loadPage, srcDesc } from './mixin'
import { Tooltip } from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const { a, div, h3, li, nav, table, tbody, td, th, thead, tr, ul } = van.tags
const Pagination = (activePage: State<number>, total: State<number>, click: (page: number) => void) => {
    const Item = (text: string, page: number) => {
        return li({ class: 'page-item' },
            a({
                href: '#',
                class: () => `page-link ${page == activePage.val ? 'active' : ''}`, onclick(event: Event) {
                    event.preventDefault()
                    if (page != -1) {
                        click(page)
                        activePage.val = page
                    }
                }
            }, text),
        )
    }
    const pageData = van.derive(() => loadPage(activePage.val, total.val))
    return nav(
        () => ul({ class: 'pagination' },
            pageData.val.prev == 0 ? '' : Item('上一页', pageData.val.prev),
            pageData.val.pages.map(page => Item(page == -1 ? '...' : page.toString(), page)),
            pageData.val.next == 0 ? '' : Item('下一页', pageData.val.next),
        ),
    )
}
const App = () => {
    const tableBody = tbody()
    const keys: (keyof Photo)[] = ['id', 'width', 'height', 'photographer', 'alt', 'src']
    const activePage = van.state(1)
    const totalPage = van.state(0)
    const pageLoading = van.state(true)
    const loadPhotos = (pageIndex: number) => {
        getPhotos(pageIndex, 100).then(data => {
            const { photos, pageSize } = data
            totalPage.val = Math.ceil(8000 / pageSize)
            photos.forEach(photo => {
                van.add(tableBody, tr(
                    keys.map(key => {
                        if (key == 'src') {
                            return Object.keys(photo.src).map((srcKey) => {
                                const ele = a({
                                    href: photo.src[srcKey as keyof Photo['src']],
                                    target: '_blank',
                                    'data-bs-toggle': 'tooltip',
                                    'data-bs-title': srcDesc[srcKey as keyof Photo['src']]
                                }, srcKey)
                                new Tooltip(ele)
                                return td(ele)
                            })
                        } else if (key == 'width' || key == 'height') {
                            return td(photo[key], 'px')
                        } else if (key == 'photographer') {
                            return td(a({ href: photo.photographerUrl, class: 'link-secondary', target: '_blank' }, photo.photographer))
                        } else if (key == 'id') {
                            return th({ scope: 'row' }, a({ href: photo.url, class: 'link-secondary', target: '_blank' }, photo.id))
                        } else if (key == 'alt') {
                            const ele = a({
                                href: '#', onclick(event: Event) { event.preventDefault() },
                                class: 'link-secondary',
                                'data-bs-toggle': 'tooltip',
                                'data-bs-placement': 'left',
                                'data-bs-title': photo.alt || '暂无描述'
                            }, '查看描述')
                            new Tooltip(ele)
                            return td(ele)
                        } else {
                            return td(photo[key] as string)
                        }
                    })
                ))
            })
            pageLoading.val = false
        })
    }
    loadPhotos(0)

    return div({ class: 'container py-4' },
        h3({ class: 'mb-4' }, '8000 张 Pexels 图片'),
        div({ class: 'overflow-x-auto mb-4' },
            table({ class: 'mb-0 table table-striped table-bordered text-center text-nowrap' },
                thead(
                    tr(
                        ['图片编号', '宽度', '高度', '摄影师', '图片描述'].map(text => th({ scope: 'col' }, text)),
                        th({ colSpan: 8 }, '图片文件')
                    ),
                ),
                tableBody
            )
        ),
        div({ hidden: pageLoading },
            Pagination(activePage, totalPage, page => {
                tableBody.innerHTML = ''
                pageLoading.val = true
                setTimeout(() => {
                    loadPhotos(page - 1)
                }, 100)
            })
        )
    )
}
van.add(document.body, App())