import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import 'fontsource-roboto';
import { 
  Container, Typography, TextField, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm" className="form-container">
        <Typography variant="h3">Crear o editar una venta</Typography>
        {
          loading 
          ? ( <p>Loading...</p> ) 
          : (
            <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>              
              {!isNew ? (
                <TextField 
                  disabled id="sales-id" type="text"
                  label="ID" value={props.match.params.id}
                  name="id"
                  variant="filled" 
                />
               ) : null
              }

              <TextField 
                id="sales-description" 
                type="text" 
                name="description" label="Description" 
                value={(!isNew && salesEntity.description)} 
              />

              <InputLabel id="stateLabel" htmlFor="sales-state">
              </InputLabel>
              <Select
                id="sales-state"
                type="select"
                name="state"
                value={(!isNew && salesEntity.state) || 'IN_CHARGE'}
              >
                <option value="IN_CHARGE">{translate('testApp.State.IN_CHARGE')}</option>
                <option value="SHIPPED">{translate('testApp.State.SHIPPED')}</option>
                <option value="DELIVERED">{translate('testApp.State.DELIVERED')}</option>
              </Select>
              
              <TextField
                id="sales-date"
                type="date"
                label="Date"
                name="date"
                value={(!isNew && salesEntity.date)}
                defaultValue="yyyy-MM-dd"
                InputLabelProps={{ shrink: true }}
              />

              <Button
                color="primary"
                id="cancel-save"
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                <Link to="/sales">Volver</Link>
              </Button>
              
              <Button
                color="primary"
                id="save-entity"
                type="submit"
                disabled={updating}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>

            </AvForm>
          )
        }
      </Container>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
