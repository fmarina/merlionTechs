import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, TextFormat} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import {
  Grid, 
  Typography, 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    
    title: {
      color: '#2c6c9c',
      marginBottom: theme.spacing(5),
    },

    paper: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      fontSize: '18px'
    },

    button: {
      backgroundColor: '#1a5b89',
      color: '#ffffff',
      "&:hover": {
        backgroundColor: '#2c6c9c',
        color: '#ffffff'
      },
      margin: theme.spacing(2),
      '& label.Mui-focused': {
        color: '#ff0000',
      },
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 350,
    }
  })
);

export const SalesUpdate = (props: ISalesUpdateProps) => {

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);  
  const classes = useStyles();

  const { salesEntity, loading, updating } = props;
  
  const [state, setState] = React.useState<string>("IN_CHARGE");
  const [description, setDescription] = React.useState<string>("")

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string);
  };

  const handleChangeDesc =  (event: React.ChangeEvent<{ value: unknown }>) => {
    setDescription(event.target.value as string);
  }

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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      style={{width: '80%', margin: 'auto', textAlign: 'center'}}
    >
      <Typography variant="h4" align="center" component="h1" className={classes.title} gutterBottom>
        <Box fontWeight="fontWeightBold" letterSpacing={1}>Crear o editar venta</Box>
      </Typography>
      
      { loading 
        ? ( <><CircularProgress /> <p>Loading...</p></> ) 
        : (
          <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
          { !isNew 
            ? (
                <Grid item xs={12}>
                   <TextField 
                    disabled 
                    id="sales-id"
                    label="Id" 
                    name="id" 
                    variant="outlined"
                    value={salesEntity.id}
                    className={classes.textField}
                  />
                </Grid>
              ) 
            : null
          }
          <Grid item xs={12}>
            <TextField 
              id="sales-description" 
              type="text" 
              name="description"
              label="Description" 
              variant="outlined"
              className={classes.textField}
              value={(!isNew ? salesEntity.description : description)}
              onChange={handleChangeDesc}
            />
          </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="sales-state"> State</InputLabel>
                <Select
                  labelId="sales-state"
                  id="demo-simple-select-outlined"
                  name="state"
                  onChange={handleChange}
                  value={(!isNew ? salesEntity.state : state)}
                  label="State"
                  className={classes.textField}
                >
                  <MenuItem value="IN_CHARGE">IN_CHARGE</MenuItem>
                  <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                  <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <AvField id="sales-date" type="date" className={classes.textField} name="date" />
              </FormControl>
            </Grid>

            <Grid container  justify="center" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                href="/sales"
              > Volver </Button>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<SaveIcon />}
                type="submit" 
                disabled={updating}          
              > Guardar </Button>
            </Grid>

          </AvForm>
        )
      }
    </Grid>
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