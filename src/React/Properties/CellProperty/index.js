import BlockMixin       from '../PropertyFactory/BlockMixin';
import layouts          from './layouts';
import React            from 'react';
import ToggleIconButton from '../../Widgets/ToggleIconButtonWidget';
import style            from 'PVWStyle/ReactProperties/CellProperty.mcss';

/* eslint-disable react/no-danger */
export default React.createClass({

    displayName: 'CellProperty',

    propTypes: {
        data: React.PropTypes.object.isRequired,
        help: React.PropTypes.string,
        onChange: React.PropTypes.func,
        show: React.PropTypes.func,
        ui: React.PropTypes.object.isRequired,
        viewData: React.PropTypes.object,
    },

    mixins: [BlockMixin],

    valueChange(idx, newVal) {
        var newData = this.state.data;
        newData.value[idx] = newVal;
        this.setState({data: newData});
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    },

    render() {
        return (
            <div className={ this.props.show(this.props.viewData) ? style.container : style.hidden }>
                <div className={ style.header }>
                    <strong>{this.props.ui.label}</strong>
                    <span>
                        <ToggleIconButton
                            icon={ style.helpIcon }
                            value={this.state.helpOpen}
                            toggle={!!this.props.ui.help}
                            onChange={this.helpToggled} />
                    </span>
                </div>
                <div className={ style.inputBlock }>
                    <table className={ style.inputTable }>
                        <tbody>
                            { layouts(this.props.data, this.state.ui, this.valueChange) }
                        </tbody>
                    </table>
                </div>
                <div className={ this.state.helpOpen ? style.helpBox : style.hidden }
                    dangerouslySetInnerHTML={{__html: this.props.ui.help}}/>
            </div>
        );
    },
});
/* eslint-enable react/no-danger */
