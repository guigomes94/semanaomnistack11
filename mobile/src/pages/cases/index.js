import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadCases() {
    if (loading) {
      return;
    }

    if (totalCases > 0 && cases.length === totalCases) {
      return;
    }

    setLoading(true);

    const res = await api.get('cases', {
      params: { page }
    });

    setCases([...cases, ...res.data]);
    setTotalCases(res.headers['x-total-count'])
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadCases();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalCases} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bemvindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={cases}
        style={styles.caseList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCases}
        onEndReachedThreshold={0.25}
        renderItem={({ item: incident}) => (
          <View style={styles.case}>
          <Text style={styles.caseProperty}>ONG:</Text>
          <Text style={styles.caseValue}>{incident.name}</Text>

          <Text style={styles.caseProperty}>CASO:</Text>
          <Text style={styles.caseValue}>{incident.title}</Text>

          <Text style={styles.caseProperty}>VALOR:</Text>
          <Text style={styles.caseValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency',
              currency: 'BRL'})
              .format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDetail(incident)}
          >
            <Text style={styles.detailsButtonText}>Mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041"/>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}
