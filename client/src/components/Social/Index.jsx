import React from 'react';
import FriendList from './FriendList';
import ClubList from './ClubList';
import NewsFeed from './NewsFeed';
import NewPostForm from './NewPostForm';
import AddFriendForm from './AddFriend';

export default function Index(props) {
  console.log('SOCIAL INDEX PROPS ======', props);

  const clubs = props.clubs;
  const clubIdList =
    clubs &&
    clubs.map((club) => {
      return club;
    });

  const news = props.news;
  const newsList =
    news &&
    news.map((post) => {
      return post;
    });

  return (
    <div>
      <AddFriendForm addFriend={props.addFriend} />
      <FriendList
        friendList={props.friends}
        deleteFriend={props.deleteFriend}
      />
      <ClubList
        setCurrClub={props.setCurrClub}
        currClub={props.currClub}
        setCurrBook={props.setCurrBook}
        list={clubIdList}
        listName={'Clubs'}
      />
      <NewPostForm
        user={props.user}
        news={props.news}
        setNews={props.setNews}
      />
      <NewsFeed newsList={newsList} listName='News' />
    </div>
  );
}
