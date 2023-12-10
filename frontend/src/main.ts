import van from 'vanjs-core'
import { Photo } from './mixin'

const { } = van.tags

const getPhotos = async (page: number = 0, pageSize: number = 36) => {
    return new Promise<Photo[]>(resolve => {
        fetch(`/api/photos?page=${page}&pageSize=${pageSize}`).then(res => {
            res.json().then(data => {
                resolve(data)
            })
        })
    })
}