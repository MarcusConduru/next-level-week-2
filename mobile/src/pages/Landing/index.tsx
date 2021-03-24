import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import style from './styles';

import ladingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing() {
    const { navigate } = useNavigation();
    const [totalConnection, settotalConnection] = useState(0);

    useEffect(() => {
        api.get('connections').then(reponse => {
            const { total } = reponse.data;

            settotalConnection(total);
        })
    }, [])

    function handleNavigationToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPage() {
        navigate('Study')
    }

    return (
        <View style={style.container}>
            <Image source={ladingImg} style={style.banner} />

            <Text style={style.title}>
                Seja bem-vindo, {'\n'}

                <Text style={style.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={style.buttonsContainer}>
                <RectButton 
                    onPress={handleNavigateToStudyPage}
                    style={[style.button,style.buttonPrimary]}
                >
                    <Image source={studyIcon}/>

                    <Text style={style.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton 
                    onPress={handleNavigationToGiveClassesPage} 
                    style={[style.button,style.buttonSecondary]}
                >
                    <Image source={giveClassesIcon}/>

                    <Text style={style.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={style.totalConnection}>
                Total de {totalConnection} conexões já realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;