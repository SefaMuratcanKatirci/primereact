import React, { Component } from 'react';
import {Link} from 'react-router';
import {DataTable} from '../../components/datatable/DataTable';
import {Column} from '../../components/column/Column';
import {CarService} from '../service/CarService';
import {Button} from '../../components/button/Button';
import {TabView,TabPanel} from '../../components/tabview/TabView';
import {CodeHighlight} from '../../components/codehighlight/CodeHighlight';
import {DataTableSubmenu} from '../../showcase/datatable/DataTableSubmenu';

export class DataTableTemplatingDemo extends Component {

    constructor() {
        super();
        this.state = {
            cars: []
        };
        this.carservice = new CarService();
        this.brandTemplate = this.brandTemplate.bind(this);
        this.colorTemplate = this.colorTemplate.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
    }

    colorTemplate(rowData, column) {
        return <span style={{color: rowData['color']}}>{rowData['color']}</span>;
    }

    brandTemplate(rowData, column) {
        var src = "showcase/resources/demo/images/car/" + rowData.brand + ".gif";
        return <img src={src} />;
    }

    actionTemplate(rowData, column) {
        return <div>
            <Button type="button" icon="fa-search"></Button>
            <Button type="button" icon="fa-edit"></Button>
        </div>;
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    render() {
        var carCount = this.state.cars ? this.state.cars.length: 0;
        var header = <div className="ui-helper-clearfix" style={{'lineHeight':'1.87em'}}>List of Cars <Button icon="fa-refresh" style={{'float':'right'}}/></div>;
        var footer = "There are " + carCount + ' cars';

        return (
            <div>
                <DataTableSubmenu />

                <div className="content-section">
                    <div className="feature-intro">
                        <h1>DataTable - Templating</h1>
                        <p>Custom content at header, body and footer sections are supported via templating.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.state.cars} header={header} footer={footer}>
                        <Column field="vin" header="Vin" />
                        <Column field="year" header="Year" />
                        <Column field="brand" header="Brand" bodyTemplate={this.brandTemplate} style={{textAlign:'center'}}/>
                        <Column field="color" header="Color" bodyTemplate={this.colorTemplate} />
                        <Column bodyTemplate={this.actionTemplate} style={{textAlign:'center', width: '6em'}}/>
                    </DataTable>
                </div>
            </div>
        );
    }
}