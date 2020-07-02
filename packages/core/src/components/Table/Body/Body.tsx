import React from 'react';
import Text from '../../Text';
import Cell from '../Cell';
import { GroupCell } from '../GroupCell';
import { getGridTemplateColumns } from '../helpers';
import Row from '../Row';
import { NoResult } from '../Row/Row.styled';
import { ColumnConfig } from '../types';
import { TBody } from './Body.styled';
import { Props } from './types';

const Body: React.FC<Props> = React.memo(props => {
    const {
        data,
        columns,
        onRowClick,
        selectedRowIds,
        rowIdentifier,
        rowClickDisableKey,
        rowSelectionDisableKey,
        onRowSelection,
        addColumnMaxSize,
        isLoading
    } = props;

    const getRow = (rowData: any = {}, configs: ColumnConfig[] = columns, field = '') =>
            configs.map(config => {
                const fieldName = `${field && `${field}.`}${config.field}`;

                return config.children ? (
                    <GroupCell
                        as={field ? 'div' : 'td'}
                        key={config.field}
                        hidden={config.hidden}
                        gridTemplateColumns={getGridTemplateColumns(config.children)}
                    >
                        {getRow(rowData[config.field], config.children, config.field)}
                    </GroupCell>
                ) : (
                    <Cell
                        key={fieldName}
                        as={field ? 'div' : 'td'}
                        isLoading={isLoading}
                        isRowClickDisabled={rowData[rowClickDisableKey]}
                        isRowSelectionDisabled={rowData[rowSelectionDisableKey]}
                        data={rowData[config.field]}
                        rowId={rowData[rowIdentifier]}
                        dottedFieldName={fieldName}
                        isRowSelected={selectedRowIds.includes(rowData[rowIdentifier])}
                        {...{ config, onRowSelection, addColumnMaxSize }}
                    />
                );
            }),
        handleRowClick = (rowData: any) => (onRowClick && !rowData[rowClickDisableKey] ? () => onRowClick(rowData) : undefined);

    return data.length === 0 ? (
        <NoResult>
            <Text>No result</Text>
        </NoResult>
    ) : (
        <TBody>
            {data.map((row, index) => (
                <Row
                    id={row[rowIdentifier] || index}
                    key={row[rowIdentifier] || index}
                    disabled={row[rowClickDisableKey]}
                    onClick={handleRowClick(row)}
                    isSelected={!isLoading && selectedRowIds.includes(row[rowIdentifier])}
                    gridTemplateColumns={getGridTemplateColumns(columns)}
                >
                    {getRow(row)}
                </Row>
            ))}
        </TBody>
    );
});
Body.displayName = 'Body';
export default Body;
