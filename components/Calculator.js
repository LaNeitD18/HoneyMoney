import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Vibration, Animated } from 'react-native';
import { sizeFactor, colors, String } from './Basic';
import { Icon } from 'react-native-elements';

export default class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            // calculation and result
            calculationText: "0",
            //resultText: ""
        };

        this.operations = ['+', '-', '*', '/'];
        this.functions = ['⌫', 'C', '='];
    }

    calculateResult() {
        const text = this.state.calculationText;

        this.setState({
            //resultText: eval(text),
            calculationText: eval(text).toString()
        })
    }

    // check if a tring is valid (the last char is a number)
    isValid() {
        const text = this.state.calculationText;
        switch (text.slice(-1)) {
            case '+':
            case '-':
            case '*':
            case '/':
                return false;
        }
        return true;
    }

    isZero() {
        if (this.state.calculationText == "0") return true;
        return false;
    }

    isDecimal() {
        const text = this.state.calculationText;
        if (text.indexOf(".") > 0) return true;
        return false;
    }

    // include all number buttons and "." (12 buttons)
    numberPressed(text) {
        // press ".", check if a text includes "." or the last char is a symbol -> do nothing
        if (text == ".") {
            const lastChar = this.state.calculationText.split('').pop();
            if (this.isDecimal() || this.operations.indexOf(lastChar) >= 0) {
                return;
            }
        }
        // check if a text is being "0"
        if (this.isZero()) {
            // press "0" or "000" -> do nothing
            if (text == "0" || text == "000") {
                return;
                // "." -> add
            } else if (text == ".") {
                this.setState({
                    calculationText: this.state.calculationText + text
                });
                // number -> replace
            } else {
                this.setState({
                    calculationText: text
                });
            }
        } else {
            this.setState({
                calculationText: this.state.calculationText + text
            });
        }
    }

    operate(operation) {
        switch (operation) {
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.calculationText.split('').pop();
                if (this.operations.indexOf(lastChar) >= 0) {
                    let text = this.state.calculationText.split('');
                    text.pop();
                    text.push(operation);

                    this.setState({
                        calculationText: text.join('')
                    });
                    return;
                }

                if (this.state.calculationText == "") return;
                this.setState({
                    calculationText: this.state.calculationText + operation
                })
        }
    }

    backspaceFunction() {
        if (this.state.calculationText.length == 1) {
            this.setState({
                calculationText: "0"
            });
        } else {
            let temp = this.state.calculationText.split('');
            temp.pop();

            this.setState({
                calculationText: temp.join('')
            });
        }
    }
    // include clear all, backspace, calculate result (=)
    basicFunctions(text) {
        switch (text) {
            case '⌫':
                this.backspaceFunction();
                break;
            case 'C':
                this.setState({
                    calculationText: "0"
                });
                break;
            case '=':
                if (this.isValid() && this.state.calculationText != "0") {
                    this.calculateResult();
                } else if (!this.isValid()) {
                    Vibration.vibrate(200);
                    //this.startShake();
                }
        }
    }

    renderNumberView() {
        let rows = [];
        let nums = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['000', '0', '.']];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(
                    <TouchableOpacity key={nums[i][j]} style={styles.button} onPress={() => this.numberPressed(nums[i][j])} >
                        <Text style={styles.buttonText}>{nums[i][j]}</Text>
                    </TouchableOpacity>
                );
            }
            rows.push(
                <View key={i} style={styles.row}>
                    {row}
                </View>
            );
        }
        return rows;
    }
    renderOperationView() {
        let rows = [];
        const icon = ['+', '-', '×', '÷']

        for (let i = 0; i < 4; i++) {
            rows.push(
                <TouchableOpacity key={this.operations[i]} style={styles.button} onPress={() => this.operate(this.operations[i])} >
                    <Text style={styles.buttonText}>{icon[i]}</Text>
                </TouchableOpacity>
            )
        }
        return rows;
    }

    render() {
        let numberRows = this.renderNumberView();
        let operationRows = this.renderOperationView();

        return (
            <View style={styles.container}>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                </View>
                <View style={{
                    backgroundColor: colors.gray3, borderColor: colors.gray2,
                    borderWidth: StyleSheet.hairlineWidth
                }}>
                    <Icon
                        name="chevron-down"
                        type="material-community"
                        color="white"
                        size={sizeFactor * 2.5}
                    />
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {numberRows}
                    </View>
                    <View style={styles.operations}>
                        {operationRows}
                    </View>
                    <View style={styles.operations}>
                        <TouchableOpacity style={styles.button} onPress={() => this.basicFunctions(this.functions[0])} >
                            <Text style={styles.buttonText}>⌫</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.basicFunctions(this.functions[1])} >
                            <Text style={styles.buttonText}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.equalButton} onPress={() => this.basicFunctions(this.functions[2])} >
                            <Text style={styles.buttonText}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calculation: {
        flex: 6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calculationText: {
        fontSize: 40,
        color: 'black',
    },
    buttons: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    numbers: {
        flex: 3,
        backgroundColor: colors.dark,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    operations: {
        flex: 1,
        backgroundColor: colors.gray
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: colors.gray2,
        borderWidth: StyleSheet.hairlineWidth
    },
    equalButton: {
        flex: 2,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: colors.gray2,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.greenDark
    },
    buttonText: {
        fontSize: sizeFactor * 1.5,
        color: 'white'
    }

});