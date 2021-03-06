import React      from 'react';
import ActionList from '../ActionListWidget';
import style      from 'PVWStyle/ReactWidgets/FileBrowserWidget.mcss';

export default React.createClass({

    displayName: 'FileBrowserWidget',

    propTypes: {
        directories: React.PropTypes.array.isRequired,
        files: React.PropTypes.array.isRequired,
        groups: React.PropTypes.array.isRequired,
        onAction: React.PropTypes.func,
        path: React.PropTypes.array.isRequired,
    },

    getInitialState() {
        return {
            list: [],
        };
    },

    componentDidMount() {
        this.processProps(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.processProps(nextProps);
    },

    processProps(props) {
        const list = [];
        props.directories.forEach( name => {
            list.push({name, icon: style.folderIcon, action: 'directory'});
        });
        props.groups.forEach( g => {
            list.push({ name: g.label, icon: style.groupIcon, action: 'group', data: btoa(JSON.stringify(g.files))});
        });
        props.files.forEach( name => {
            list.push({name, icon: style.fileIcon, action: 'file'});
        });
        this.setState({list});
    },

    onAction(name, action, data) {
        if(this.props.onAction) {
            this.props.onAction(action, name, data.length ? JSON.parse(atob(data)) : null);
        }
    },

    onPathChange(event) {
        var target = event.target;
        while(target.localName !== 'li') {
            target = target.parentNode;
        }
        if(this.props.onAction) {
            const path = [];
            const pathSize = Number(target.dataset.idx);
            while(path.length <= pathSize) {
                path.push(this.props.path[path.length]);
            }
            this.props.onAction('path', path.join('/'), path);
        }
    },

    render() {
        return (
            <div className={ style.container }>
                <ul className={ style.breadcrumb }>
                { this.props.path.map( (name, idx) => {
                    return <li className={ style.breadcrumbItem } key={name} data-idx={idx} title={name} onClick={ this.onPathChange }>
                                <i className={ style.breadcrumbFolderIcon }></i>
                                <span className={ style.breadcrumbLabel }>{name}</span>
                            </li>
                })}
                </ul>
                <ActionList list={this.state.list} onClick={ this.onAction }/>
            </div>);
    },
});
