import React, { Component } from 'react';
import "./Form_1.css"


export default class Form1 extends Component {

    constructor(props) {
        super(props);
        this.state = { //Standart yapida bir state olusturduk ve username ile password un icine bos deger atadik.
            username: "",
            password: "",
            formSending: false,
            isLogin: false,
            errors: {
                username: "",
                password: "",
                formError: ""
            }
        };
    }

    isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    

    inputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    
    //Kontrol degerleri
    let max = Number(e.target.max);
    let required = e.target.required;
     
    //Her defasinda girilen e parametresine gore stati sifirlaniyor
    this.setState({
        errors: {
            ...this.state.errors,
            [e.target.name]: ""
        }
    });

    //Eger user name inputu ise ve girilen email hatali ise..
    if(e.target.name === "username" && this.isEmailValid(this.state.username) === false){
        this.setState({
            errors: {
                ...this.state.errors,
                username: "Email hatali, kontrol edin."
            }
        });
    }

    //Eger required ile zorunlu alan varsa ce icerigi bossa
    if(required && e.target.value === ""){
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ""
            }
        });
    }

    //Eger girilen input verisi uzunlugu, max attribute degerrini asmissa..
    if(e.target.value.length > max){
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: "Giris hatali." + e.target.max + "siniri asildi."
            }
        });
    }
}

    formSubmit = () => {
        this.setState({ //Oncelikle formSendin true doner ve asagidaki Giris yapiliyor... yazisi calisir
            formSending: true
        });
        setTimeout( () => { // setTimeout ile 1 saniye sonra
            this.setState({// burasi devreye girer
                formSending: false,
                isLogin: true
            });
        }, 1000);
    }

    render() {
        let { username, password, isLogin, formSending } = this.state;

        return(
            isLogin?
            <div>Hos Geldiniz</div>
            : formSending ?
            <div>Giris Yapiliyor...</div>
            :
            <div>
                <h5>Form 1</h5>
                <form onSubmit={this.formSubmit}> {/* formda giris butonu tiklaninca, onSubmit metodu tetiklenir ve formSubmit fonksiyonu cagirilir */}
                    <label>Kullanici adi</label><br /> {/* onChange(degisiklik) oldugunda inputChange() fonsiyonu cagiriliyor */}
                    <input type="email" name="username" value={username} onChange={this.inputChange} max="32" required /><br />
                    <small>{this.state.errors.username}</small>
                    <label>Parola</label><br />        {/* onChange(degisiklik) oldugunda inputChange() fonsiyonu cagiriliyor */}
                    <input type="password" name="password" value={password} onChange={this.inputChange} max="16" required /><br />
                    <small>{this.state.errors.password}</small>
                    <input type="submit" value="Giris" />
                </form>
            </div>
        )
    }
}