import styled from 'styled-components';

export const Container = styled.View``;

export const Post = styled.View`
  margin-top: 16px;
`;

export const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;

export const Description = styled.Text`
  padding: 16px;
  line-height: 18px;
`;
