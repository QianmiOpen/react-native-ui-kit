import React, {StyleSheet, View} from 'react-native';

class NoNetwork extends React.Component {
    
    static defaultProps = {
    };
    
    state = {
    }; 
    
    componentDidMount(){
    }
    
    render(){
        return (
            <View
                style={styles.container}
                >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default NoNetwork; 