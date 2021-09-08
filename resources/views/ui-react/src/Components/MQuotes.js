import React from 'react';
import List from './ListMQuotes'

class Published extends React.Component {

    constructor(props) {
        super(props);
        //this.data = []
        this.state = {
            creador: [],
            modal: false,
            page: 0
        }

        this.showDataEdit = this.showDataEdit.bind(this)
        this.addPage = this.addPage.bind(this);
    }

    showDataEdit() {
        this.setState(prevState => ({
            modal: !prevState.modal
          }));
    }

    async callApi(count=0) {
        const options = {
            method: "POST",
            data: {
                method: "GetTransRangeByDate",
                url: "http://98.211.167.16:3691",
                data:[
                    '9601',
                    "QT",
                    "2021-07-01",
                    "2021-08-14",
                    '52488'
                ]
            }

        }
        fetch("http://localhost/zoho_crm_magaya_ext/public/api", options)
            .then(res => res.json())
            //.then(res => res.text())
            .then(res => {
                //this.setState({ apiResponse: res })
                this.setState({
                    creador: res.data
                })
                //this.data = res.data
                console.log(res.data)
                //this.setState({ title: res.data[0].title })
            })
            .catch(err => err)
    }

    componentDidMount() {
        //this.callApi(1);
    }

    addPage() {
        this.page = this.state.page;
        this.callApi(this.page);
        this.page = this.setState({page: this.page+1})
    }

    render() {
        const creador = this.state.creador;
        return (

        <div><List creador={creador}/></div>
            )

    }

};

export default Published;
