import {Link, Tabs} from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { uiColors } from '@/constants/colors';

const titles: Record<string, string> = {
    wiki: 'Wiki',
    favorites: 'Favoris',
    index: 'Accueil',
    acdle: 'ACDle',
    memo: 'Memo',
};

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: uiColors.header.background,
                    borderBottomWidth: 5,
                    borderBottomColor: uiColors.header.border,
                },
                headerTitle: () => {

                    return (
                        <View style={headerTitleContainerStyle}>
                            <Text style={headerTitleStyle}>{titles[route.name] || 'App'}</Text>
                            <Link href="/">
                                <Image source={require('@/assets/images/icons/leaf.png')} style={headerIconStyle} />
                            </Link>
                        </View>
                    );
                },
                tabBarActiveTintColor: uiColors.navBar.activeIcon,
                tabBarStyle: {
                    height: "10%",
                    bottom: 0,
                    backgroundColor: uiColors.navBar.background,
                    borderTopWidth: 5,
                    borderColor: uiColors.navBar.border,
                },
                animation: "none",
                tabBarHideOnKeyboard: true
            })}
        >
        <Tabs.Screen
                name="wiki"
                options={{
                    title: 'Wiki',
                    tabBarIcon: () => <Image source={require('@/assets/images/icons/owl.png')} style={tabIconStyle} />,
                    tabBarLabelStyle: tabLabelStyle,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoris',
                    tabBarIcon: () => <Image source={require('@/assets/images/icons/star.png')} style={tabIconStyle} />,
                    tabBarLabelStyle: tabLabelStyle,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarIcon: () => <Image source={require('@/assets/images/icons/leaf.png')} style={tabIconStyle} />,
                    tabBarLabelStyle: tabLabelStyle,
                }}
            />
            <Tabs.Screen
                name="acdle"
                options={{
                    title: 'ACDle',
                    tabBarIcon: () => <Image source={require('@/assets/images/icons/feather.png')} style={tabIconStyle} />,
                    tabBarLabelStyle: tabLabelStyle,
                }}
            />
            <Tabs.Screen
                name="memo"
                options={{
                    title: 'Memo',
                    tabBarIcon: () => <Image source={require('@/assets/images/icons/ticket.png')} style={tabIconStyle} />,
                    tabBarLabelStyle: tabLabelStyle,
                }}
            />
        </Tabs>
    );
}

const tabIconStyle = {
    width: 50,
    height: 50,
    marginTop: 16,
}

const tabLabelStyle = {
    fontFamily: 'FinkHeavy',
    fontSize: 14,
    marginTop: 16,
}

const headerTitleContainerStyle = {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    width: '100%' as '100%',
    paddingHorizontal: 16,
}

const headerTitleStyle = {
    fontFamily: 'FinkHeavy',
    fontSize: 30,
    color: uiColors.header.text,
}

const headerIconStyle = {
    width: 50,
    height: 50,
}

export default TabLayout;