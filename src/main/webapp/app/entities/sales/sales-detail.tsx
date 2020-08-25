import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import {Grid, Typography, Box, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: '#2c6c9c',
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
      margin: theme.spacing(2)
    }
  })
);

export const SalesDetail = (props: ISalesDetailProps) => {

  const classes = useStyles();

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salesEntity } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      <Typography variant="h4" align="center" component="h1" className={classes.title} gutterBottom>
        <Box fontWeight="fontWeightBold" letterSpacing={1}>
          Detalle de venta #{salesEntity.id}
        </Box>
      </Typography>

      <Grid item xs={12}>
        <Paper variant="outlined" className={classes.paper}>
          <span style={{fontWeight: 'bold'}} className={classes.title}>Description: </span> 
          {salesEntity.description}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper variant="outlined" className={classes.paper}>
          <span style={{fontWeight: 'bold'}} className={classes.title}>State: </span> 
          {salesEntity.state}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper variant="outlined" className={classes.paper}>
          <span style={{fontWeight: 'bold'}} className={classes.title}>Date: </span> 
          { salesEntity.date 
            ? <TextFormat value={salesEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> 
            : null
          }
        </Paper>
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
          startIcon={<EditIcon />}
          href={`/sales/${salesEntity.id}/edit`}
        > Editar </Button>
      </Grid>
    </Grid>    
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
