import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { useState, useEffect } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ChampDisplay } from '@/components/ChampDisplay';

import baseTeams from "@/assets/json/baseTeams.json";

export default function TabTwoScreen() {

  const [teams, setTeams] = useState(baseTeams)
  useEffect(() => {
    fetchAndSetChamps()
  }, []);

  function fetchAndSetChamps() {
    fetch("http://localhost:3000/GET")
    .then(response => response.json())
    .then(data => {
      setTeams(data);
    });
  }

  var teamCardsHTML = [];

  for(let i = 0; i < teams.length; i++) {
  var team = teams[i];
  var name = team.name
  var wins = team.wins
  var losses = team.losses
  var logo = team.logo
  var champDisplay = <ChampDisplay key={i} name={name} wins={wins} losses={losses} logo={logo} />
  teamCardsHTML.push(champDisplay);
}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="star-outline" style={styles.headerImage} />}>
      <ThemedText type='title'>🏀 NBA Teams 🏀</ThemedText>
      <div id="recipeCardSection" style={{
display: "flex",
flexWrap: "wrap",
justifyContent: "center",
marginBottom: "5%"}}>
  {teamCardsHTML}
</div>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -120,
    left: -10,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
