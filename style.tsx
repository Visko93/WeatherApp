import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#79EA33',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 2,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Chango_400Regular',
    fontSize: 32,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  temp: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 80
  },
  minMax: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  minMaxText: {
    color: '#303030',
    fontFamily: 'Roboto_400Regular',
    marginHorizontal: 20
  },
  infos: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: -20

  },
  InfosText: {
    color: '#303030',
    fontFamily: 'Roboto_400Regular',
  }

});