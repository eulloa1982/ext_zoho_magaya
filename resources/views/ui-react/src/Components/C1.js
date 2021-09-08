import React, { Component } from 'react';
import Creador from './ListMQuotes'


class List extends Component {
    constructor(props) {
        super(props);
        //this.data = []
        this.state = {
            creador: [],
            modal: false,
            page: 0,
            loading: false
        }


    }


    async callApi(count=0) {
        this.setState({loading: true});

        let data = new URLSearchParams();
        data.append("method",'GetTransRangeByDate')
        data.append('url','http://98.211.167.16:3691')
        data.append('data[0]','96101')
        data.append('data[1]', 'QT')
        data.append('data[2]', "2021-07-01")
        data.append('data[3]', "2021-08-14")
        data.append('data[4]', "52488")

        const options = {
            method: `POST`,
            body: data
            };



        fetch("http://localhost/zoho_crm_magaya_ext/public/api", options)
            .then(res => res.json())
            //.then(res => res.text())
            .then(res => {
                this.setState({loading: false});
                //this.setState({ apiResponse: res })
                this.setState({
                    creador: res.data['Quotation']
                })
                //this.data = res.data
                console.log(res.data)
                //this.setState({ title: res.data[0].title })
            })
            .catch(err => err)
    }

    componentDidMount() {
        this.callApi(1);
    }




    render() {
        const creador = this.state.creador;
        const loading = this.state.loading;

        return (<span><div>{ loading ? 'Cargando' : ''}<div class="overflow-auto"><Creador creador={creador}  /></div>

        <div><button class="bg-green-500 hover:bg-green-700 text-white font-bold rounded p-1" onClick={this.addPage}>Up</button></div>


        </div></span>)

    }
}

export default List;
