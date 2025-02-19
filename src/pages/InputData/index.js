import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcInputData} from '../../assets';
import {
  ButtonList,
  Gap,
  HeaderDetail,
  Select,
  Steps,
  StepsKimia,
  StepsPerbaikan,
} from '../../components';
import { setPenugasanValue } from '../../utils';
import storage from '../../utils/storage';

const InputData = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [dataWmp, setDataWmp] = useState([]);
  const [wmp, setWmp] = useState('1');
  const [stepper, setStepper] = useState('AAT');

  useEffect(() => {
    storage
      .load({
        key: 'tambang',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((res) => {
        setPenugasan(setPenugasanValue(res.nama));
        setWmp(res.wmp[0].id);
        setDataWmp(res.wmp);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  storage.save({
    key: 'wmp',
    data: wmp,
  });

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={11} />
        <View style={styles.select}>
          <Select
            value={penugasan}
            type="Penugasan"
            onSelectChange={(value) => setPenugasan(value)}
            enabled={false}
          />
        </View>
        <View style={styles.containerMenu}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menu}
            onPress={() => navigation.navigate('InputData')}>
            <IcInputData />
            <Text style={styles.menuText}>Input Data</Text>
          </TouchableOpacity>
          <View style={styles.wmp}>
            <Select
              value={wmp}
              type="WMP"
              onSelectChange={(value) => setWmp(value)}
            />
          </View>
        </View>
        {/* Content */}
        <View style={styles.contentMenu}>
          {stepper === 'AAT' ? (
            <ButtonList text="AAT" onPress={() => setStepper('AAT')} active />
          ) : (
            <ButtonList text="AAT" onPress={() => setStepper('AAT')} />
          )}
          {stepper === 'Bahan Kimia' ? (
            <ButtonList
              text="Bahan Kimia"
              onPress={() => setStepper('Bahan Kimia')}
              active
            />
          ) : (
            <ButtonList
              text="Bahan Kimia"
              onPress={() => setStepper('Bahan Kimia')}
            />
          )}
          {stepper === 'Perbaikan' ? (
            <ButtonList
              text="Perbaikan"
              onPress={() => setStepper('Perbaikan')}
              active
            />
          ) : (
            <ButtonList
              text="Perbaikan"
              onPress={() => setStepper('Perbaikan')}
            />
          )}
        </View>
        <View style={styles.containerSteps}>
          {stepper === 'AAT' && <Steps wmp={wmp} dataWmp={dataWmp} />}
          {stepper === 'Bahan Kimia' && <StepsKimia wmp={wmp} dataWmp={dataWmp} />}
          {stepper === 'Perbaikan' && <StepsPerbaikan wmp={wmp} dataWmp={dataWmp} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default InputData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: normalize(11),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: normalize(20),
  },
  wmp: {
    flex: 1,
    marginHorizontal: normalize(15),
  },
  select: {
    marginHorizontal: normalize(15),
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#286090',
  },
  contentMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(40),
    marginTop: normalize(-10),
  },
  containerSteps: {
    flex: 1,
  },
});
