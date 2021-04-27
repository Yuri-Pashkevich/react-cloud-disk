import { addFile, setFiles, deleteFileAction } from '../reducers/fileReducer'
import { instanceAxios } from '../utils/AxiosInstance'
import { addUploadFile, changeUploadFile, showUploader } from '../reducers/uploadReducer'
import { hideLoader, showLoader } from '../reducers/loadReducer'

export const getFiles = (dirId, sort) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `files`
            if (dirId) {
                url = `files?parent=${dirId}`
            }
            if (sort) {
                url = `files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `files?parent=${dirId}&sort=${sort}`
            }
            const response = await instanceAxios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await instanceAxios.post(`files`, 
            {
                name,
                parent: dirId,
                type: 'dir'
            }, 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

let id = 0

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if(dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = { name: file.name, progress: 0, id: id++ }
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await instanceAxios.post(`files/upload`,
                formData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
                    onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploadFile(uploadFile))
                        }
                    }
                }
            )
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const downloadFile = async file => {
    const response = await instanceAxios.get(`files/download?id=${file._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
    })
    if (response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = file => {
    let confirm = window.confirm("Are you sure?")
    if(!confirm) {
        return file
    }
    return async dispatch => {
        try {
            const response = await instanceAxios.delete(`files?id=${file._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export const searchFile = search => {
    return async dispatch => {
        try {
            const response = await instanceAxios.get(`files/search?search=${search}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}