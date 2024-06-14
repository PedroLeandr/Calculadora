const visor = document.getElementById('visor');
        let currentInput = '';
        let operator = '';
        let previousInput = '';

        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;

                if (!isNaN(value) || value === '.') {
                    handleNumber(value);
                } else {
                    handleOperator(value);
                }
                updateVisor();
            });
        });

        function handleNumber(value) {
            if (isNaN(currentInput)) {
                currentInput = '';
            }

            if (currentInput.includes('.') && value === '.') return;

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }

        function handleOperator(value) {
            switch (value) {
                case 'AC':
                    currentInput = '0';
                    operator = '';
                    previousInput = '';
                    break;
                case 'RET':
                    currentInput = currentInput.slice(0, -1) || '0';
                    break;
                case '%':
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    break;
                case '=':
                    if (operator && previousInput) {
                        currentInput = calculate(previousInput, currentInput, operator);
                        operator = '';
                        previousInput = '';
                    }
                    break;
                default:
                    if (currentInput) {
                        if (previousInput) {
                            currentInput = calculate(previousInput, currentInput, operator);
                        }
                        operator = value;
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    break;
            }
        }

        function calculate(num1, num2, operator) {
            const n1 = parseFloat(num1);
            const n2 = parseFloat(num2);
            let result;
            switch (operator) {
                case '+':
                    result = n1 + n2;
                    break;
                case '-':
                    result = n1 - n2;
                    break;
                case '*':
                    result = n1 * n2;
                    break;
                case '/':
                    result = n1 / n2;
                    break;
                default:
                    result = num2;
                    break;
            }
            return isNaN(result) ? 'NaN' : result.toString();
        }

        function updateVisor() {
            visor.innerText = currentInput || '0';
        }