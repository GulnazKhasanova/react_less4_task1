import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './App.module.css';

const fieldsSchema =  yup.object()
	.shape({
		login: yup.string()
			.matches(/^[\w_]*$/, 'Неверный логин. Вы ввели недопустимые символы')
			.min(3, 'Неверный логин. Длина не может быть меньше 3 символов')
			.max(20, 'Неверный логин. Должно быть не больше 20 символов'),
		passwd: yup.string()
			.required("Password is required")
			.min(3, 'Неверный пароль. Длина не может быть меньше 3 символов')
			.oneOf([yup.ref("confirm")], "Passwords do not match"),
		confirm: yup.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("passwd")], "Passwords do not match"),
	})


export const App = () => {
	const {
		register,    // для регистрации пропов инпута
		handleSubmit,
		formState: { errors }
	} = useForm({
			mode: "onTouched",
			defaultValues: {
				login: '',
				confirm: '',
			},
			resolver: yupResolver(fieldsSchema)
		});

	const formError = {
		loginError : errors.login?.message,
		passwdError: errors.passwd?.message,
		confirmError : errors.confirm?.message,
	};
	let em = true
	em = Object.values(formError).every((el) => el === undefined)

	const onSubmit = (formData) => {
		console.log(formData)
	}

	return (
		<div className={styles.app}>
			{/* {loginError && <div className={styles.errorLabel}>{loginError}</div>} */}
			<form onSubmit={handleSubmit(onSubmit)}>
				{formError.loginError && <div className={styles.errorLabel}>{formError.loginError}</div>}
				<label className ={styles.subtitle}> Login</label>
				<input name="login" type="text" {...register('login')}/>
				{formError.passwdError && <div className={styles.errorLabel}>{formError.passwdError}</div>}
				<label className ={styles.subtitle}> Password</label>
				<input name="passwd" type="text" {...register('passwd')}/>
				{formError.confirmError && <div className={styles.errorLabel}>{formError.confirmError}</div>}
				<label className ={styles.subtitle}> Confirmation</label>
				<input name="confirm" type="text" {...register('confirm')}/>
				<button
				className= { em ? styles.buyBtn + ' ' + styles.buyBtnPrice + ' ' + styles.buyBtnText : styles.buyBtnPrice + ' ' + styles.buyDis }
				type="submit"
				disabled={!em} > ОТПРАВИТЬ</button>
			</form>

		</div>
		)
}




