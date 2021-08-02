# 인프런 코딩 테스트

## 환경 구성
1. `yarn` 실행
2. `yarn start` 실행 (API 서버 실행)
   - port : 3000

## 서비스 내용
강의를 검색하고 검색 결과를 리스트로 볼 수 있는 페이지를 만듭니다.
아래 강의 리스트와 강의 검색에 관한 기능 요청을 참고해서 서비스를 만듭니다.
## 강의 리스트 페이지의 구현은 다음을 참고합니다.
1. 아래 API 명세를 참고하여 서버에서 응답으로 받은 강의 리스트를 노출합니다.
2. 무한 스크롤을 이용하여 강의 리스트를 노출합니다.
3. 각 강의는 다음 내용을 포함합니다.
   - 강의 이미지
   - 강의 제목
   - 지식공유자 이름
   - 강의 가격
4. 각 강의는 클릭하면 강의 상세 페이지로 이동할 수 있어야 합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.
   - 단, 페이지 이동은 가능해야 합니다.

## 강의 검색의 구현은 다음을 참고합니다.
1. 검색창에 검색어 입력시 입력창 하단에 검색 결과 리스트를 표시합니다. 사용 API는 명세를 참고합니다.
   - 검색 결과는 강의 제목을 나열합니다.
2. 검색어가 2자 이상이면 검색 결과를 노출합니다.
3. 검색창을 포커싱할 때 이미 입력되어있는 검색어가 있다면 검색 결과를 노출합니다.
4. 검색창이 포커싱 아웃(blur)되면 검색결과 리스트를 숨깁니다.
5. 검색 결과에 나타난 강의 제목을 클릭하면 해당 강의 상세 페이지로 이동합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.

## 각 구현은 다음을 참고합니다.
1. HTML 페이지를 제공하는 서버는 `server.js`의 NodeJS 서버를 활용해도 되고 별도의 서버를 만들어 사용해도 됩니다.
2. 페이지는 반응형으로 동작 하고 모바일 버전도 고려되어야 합니다.
3. React, Vue, Angular, Svelte와 같은 프론트엔드 라이브러리 또는 프레임워크를 사용하지 않고 Vanilla Javascript를 통해 개발해야합니다.
   - 기타 다른 패키지의 사용에는 제한이 없습니다.
4. API는 아래 [API 명세](#API-명세)를 참고합니다.
5. 아래 [**구현 설명**](#구현-설명) 영역에는 과제에 대해 설명 또는 전달하고 싶은 내용을 자유롭게 적어주시면 됩니다.
6. 위 참고 내용 외에 다른 내용을 구현하는 것은 자유롭게 진행합니다.
   - 위에 요구된 내용은 필수 항목입니다. 즉, 필수 요구사항을 충족한다면 구현 방식은 자유입니다.

## API 명세
<table>
<tbody>
<tr>
<th>Method</th>
<th>URL</th>
<th>Query String</th>
<th>Body</th>
<th>Response</th>
<th>비고</th>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses`
</td>
<td>

`page`: (*기본값: 1, 값: 1 이상의 number*) 페이지<br/>
`count`: (*기본값: 20, 값: 1 이상의 number*) 페이지당 컨텐츠 수<br/>
`lastContentId`: (*값: 1 이상의 number*) 요청하는 페이지의 이전 페이지 마지막 컨텐츠 id<br/>
`search`: (*값: string*) 검색어
</td>
<td></td>
<td>

success
```javascript
{
   "ok": true,
   "data": {
      "courses": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
            "price": (number) 강의 가격,
            "coverImageUrl": (string) 강의 커버 이미지
         },
         ...
      ]
   }
}
```
fail
```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```
</td>
<td>강의리스트</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses/:courseId`
</td>
<td></td>
<td></td>
<td>

success
```javascript
{
   "ok": true,
   "data": {
      "course": {
         "id": (number) 강의 ID,
         "title": (string) 강의 제목,
         "instructorName": (string) 지식공유자 이름,
         "price": (number) 강의 가격,
         "coverImageUrl": (string) 강의 커버 이미지
      }
   }
}
```
fail
```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```
</td>
<td>강의상세</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/search/courses`
</td>
<td>

`keyword`: (*값: string*) 검색어<br/>
`max`: (*기본값: 10, 값: 1 이상의 number*) 검색결과 최대 갯수<br/>
</td>
<td></td>
<td>

success
```javascript
{
   "ok": true,
   "data": {
      "results": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
         },
         ...
      ]
   }
}
```
fail
```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```
</td>
<td>검색</td>
</tr>
</tbody>
</table>


## 구현 설명