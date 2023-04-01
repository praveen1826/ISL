import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

export default About = () => {
  const Section = ({children, title}): Node => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle]}>{title}</Text>
        <Text style={[styles.sectionDescription]}>{children}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View>
        <Section title="Indian Sign Language">
          This Is An App For Detecting Indian Sign Language
        </Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
  },
});
