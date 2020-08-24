import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';


import Paper from '@material-ui/core/Paper';
import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export const Sales = (props: ISalesProps) => {
  const classes = useStyles();

  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    
    <div>
      <h2 id="sales-heading">
        <Translate contentKey="testApp.sales.home.title">Sales</Translate>
        <Link to={`${match.url}/new`} className="float-right">
          <Fab color="primary" aria-label="add"><AddIcon /></Fab>
        </Link>
      </h2>

      <div className="table-responsive">
      {
        salesList && salesList.length > 0 
        ? (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table1 stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell> Actions </TableCell>                  
                    <TableCell> Id </TableCell>
                    <TableCell> Description </TableCell>
                    <TableCell> State </TableCell>
                    <TableCell> Date </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {salesList.map((sales, i) => (                    
                    <TableRow key={`entity-${i}`} hover role="checkbox" tabIndex={-1}>

                      <TableCell>
                        <IconButton aria-label="findinpage"><FindInPageIcon fontSize="small"/></IconButton>
                        <IconButton aria-label="delete"><EditIcon fontSize="small" /></IconButton>
                        <IconButton aria-label="delete"><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>

                      <TableCell>
                        <Button tag={Link} to={`${match.url}/${sales.id}`} color="link" size="sm">
                          {sales.id}
                        </Button>
                      </TableCell>

                      <TableCell>
                        {sales.description}
                      </TableCell>

                      <TableCell>
                        <Translate contentKey={`testApp.State.${sales.state}`} />
                      </TableCell>

                      <TableCell>
                        {sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table1>        
            </TableContainer>
          </Paper>
        ) 
        : ( !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
              </div>
            )
          )
      }
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
