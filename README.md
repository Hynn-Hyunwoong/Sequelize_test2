## Sequelize ORM
```javascript

Setting Database
Table list
- User
- Board
- Comment
- Liked
- Hash
- Hashtag

``` sql
CREATE TABLE person(
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    PRIMARY KEY(first_name, last_name),

);


```
``` table detail
1) User
- Userid
- Userpw
- Username
- Provider 
> LoginType (ex. Local, External System(KAKAO, DAUM, NAVER...))
> DataType enum.. 
- snsId 

2) Baord
- id
- subject
- content
- userid
- createAt
- hit 


3) Comment
- id
- boardid 
- userid 

4) liked
- userid
- boardid 

5) hash
- tag 

6) hashtag
- boardid 
- tag
```
### Add to Feature ###
1. Create Board 
2. Read Board-List
> Board Comment + Like , Hashtag
3.  

