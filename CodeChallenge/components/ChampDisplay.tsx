import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import { Card, ListGroup } from 'react-bootstrap';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ChampDisplay(props: { logo: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; wins: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; losses: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {

  return (
    <Card style={{ width: '20rem', margin: '2rem' }}>
      <Card.Img variant="top" src={props.logo} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Wins: {props.wins} minutes</ListGroup.Item>
        <ListGroup.Item>Losses: {props.losses}</ListGroup.Item>
      </ListGroup>
    </Card>
  // <ThemedView style={styles.stepContainer}>
  //   <ThemedText type="subtitle">{props.name}</ThemedText>
  //   <ThemedText> ✅ Wins: {props.wins} </ThemedText>
  //   <ThemedText> ❌ Role: {props.losses} </ThemedText>
  // </ThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
