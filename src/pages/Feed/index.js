import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

import {
  Container,
  Post,
  Header,
  Avatar,
  Name,
  PostImage,
  Description,
  Loading,
} from './styles';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setFeed([...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
        ListFooterComponent={loading && <Loading />}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar source={{uri: item.author.avatar}} />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage source={{uri: item.image}} ratio={item.aspectRatio} />
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </Container>
  );
}
