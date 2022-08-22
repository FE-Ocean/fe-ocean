"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// URL 이 ?id=123123 이런식으로 온다고 가정하겠습니다.
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
// 리뷰 상세글 불러오기
const getReviewDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmYyOTY3MTdhZTY2NjU4MWE1ZWYwMSIsImV4cCI6MTY2NjA3MzQ0NywiaWF0IjoxNjYwODg5NDQ3fQ.E6AKCeNOXPKQUdo8fkIaEsvUrl_bovHU6aFNgSw2jzU';
        const url = `https://mandarin.api.weniv.co.kr/post/${id}`;
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = yield response.json();
        if (json.post) {
            setReviewDetail(json.post);
        }
        else {
            throw new Error('리뷰 상세를 불러오는 과정에서 에러가 발생했습니다.');
        }
    }
    catch (error) {
        console.error(error);
    }
});
// 현재는 임시 ID값을 넣어주었습니다.
getReviewDetail('62ff2be317ae666581a5ef33');
// id값으로 받아온 리뷰상세 설정해주기
const setReviewDetail = (post) => {
    const h2 = document.querySelector('.movie-title');
    const imgPoster = document.querySelector('.img-poster');
    const p = document.querySelector('.text-story');
    const span = document.querySelector('.text-date');
    if (h2 instanceof HTMLHeadingElement) {
        h2.textContent = '임시 제목입니다.';
    }
    if (imgPoster instanceof HTMLImageElement) {
        imgPoster.src = `${post.image}`;
    }
    if (p instanceof HTMLParagraphElement) {
        p.textContent = `${post.content}`;
    }
    if (span instanceof HTMLSpanElement) {
        span.textContent = `${post.createdAt
            .slice(0, 11)
            .replace('-', '년 ')
            .replace('-', '월 ')
            .replace('T', '일')}`;
    }
};