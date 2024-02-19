import axios from 'axios';
import { BASE_URL } from 'api/config';
import { PAGE_SIZE } from './constans';

// api

export async function getFeedApi(page, success) {
    await axios
        .get(`${BASE_URL}/reports?page=${page}&limit=${PAGE_SIZE}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(success)
        .catch((error) => {
            console.log(error);
        });
}

export async function getCommentApi(reportId, success) {
    await axios
        .get(`${BASE_URL}/reports/${reportId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(success);
}

export async function modifyCommentApi(commentId, data) {
    return await axios
        .patch(
            `${BASE_URL}/comments/${commentId}`,
            {
                content: data,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        .then(() => {
            return true; // 요청이 성공하면 true 반환
        })
        .catch((error) => {
            console.log(error);
            return false; // 요청이 실패하면 false 반환
        });
}

export async function likeApi(reportId) {
    await axios
        .post(
            `${BASE_URL}/reports/${reportId}/likes`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        .catch((error) => {
            console.log(error);
            alert('좋아요 요청에 실패하였습니다!');
        });
}
