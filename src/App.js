import { useState, useRef } from 'react';
// import Select from 'react-select';
import styles from './App.module.css';


export const App = () => {

	const [login, setLogin] = useState('');
	const [formError, setFormError] = useState({});
	const [loginError, setLoginError] = useState(null);
	const [passwdError, setPasswdError] = useState(null);

	const submitButtonRef = useRef(null);

	const [passwd, setPasswd] = useState('');
	const [confirm, setConfirm] = useState('');

	const [disabl, setDisabl] = useState(true);

	const checkedPass = (target, variable) => {

		let error = null;
		if(variable !== target) {
			error = 'Введенное значение не совпадает с паролем. Попробуйте еще раз.'
			setPasswdError(error);
			setFormError({...formError, passwdError: error })
			disabledCheck({...formError, passwdError: error })

		} else {
			setFormError({...formError,  passwdError: null })
			disabledCheck({...formError, passwdError: error })
			setPasswdError(null)
			submitButtonRef.current.focus();
		}
		return error
	}

	const onLoginChange = ({ target }) => {
		setLogin(target.value);

		let error = null;
		if(!/^[\w_]*$/.test(target.value)) {
			error = 'Неверный логин. Вы ввели недопустимые символы'

		} else if(target.value.length > 20) {
			error = 'Неверный логин. Должно быть не больше 20 символов'
		}
		setLoginError(error);
		setFormError({...formError,  loginError: error});

		if(target.value.length === 20){
			setFormError( {...formError,  loginError:null })
		}
		disabledCheck(formError)
	}

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(login, passwd)
	}
	const onLoginBlur =() => {
		let error = loginError;
		if(login.length <3){
			error = 'Неверный логин. Длина не может быть меньше 3 символов';
			setLoginError(error);
			setFormError({...formError,  loginError: error });
		} else {
			setFormError( {...formError,  loginError:null })
		}
		disabledCheck(formError);
	}

	const onPasswdBlur = ({ target }) => {
		setPasswd(target.value);

		if(target.value.length < 3) {
			setPasswdError('Неверный пароль. Пароль не должен быть меньше 3 символов.')
		} else {
			checkedPass(target.value, confirm)
		}
	}

	const onComfirmBlur = ({ target }) => {
		setConfirm(target.value);
		checkedPass(target.value, passwd)
	}


	const disabledCheck = (formError) => {
		if(Object.keys(formError).length < 2) {

			return setDisabl(true);

		} else if(Object.keys(formError).length === 2 ){

			let res = Object.values(formError).every( el => {
				return el === null})

			return setDisabl(!res)
		}

	}

	return (
		<div className={styles.app}>
		<form onSubmit={onSubmit}>
			{loginError && <div className={styles.errorLabel}>{loginError}</div>}
			<label className ={styles.subtitle}> Login</label>
			<input
				name="login"
				type="text"
				value={login}
				onChange={onLoginChange}
				onBlur={onLoginBlur}
				placeholder="login"
				/>
			{passwdError && <div className={styles.errorLabel}>{passwdError}</div>}
			<label className ={styles.subtitle}> Password</label>
			<input
				name="password"
				type="text"
				value={passwd}
				onChange={onPasswdBlur}
				placeholder="password"
				/>
			<label className ={styles.subtitle}> Confirmation</label>
			<input
				name="confirm"
				type="text"
				value={confirm}
				onChange={onComfirmBlur}
				placeholder="confirmation"
				/>
			<button
				className= {!disabl ? styles.buyBtn + ' ' + styles.buyBtnPrice + ' ' + styles.buyBtnText : styles.buyBtnPrice + ' ' + styles.buyDis }
				ref={ submitButtonRef }
				type="submit"
				disabled={disabl}
				>Отправить</button>
		</form>
	</div>)
}




