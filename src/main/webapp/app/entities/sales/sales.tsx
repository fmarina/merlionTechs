import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  tableHead: {
    backgroundColor: '#000000'
  },
  link: {
    color: '#004f87'
  }
});

export const Sales = (props: ISalesProps) => {
  const classes = useStyles();

  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    
    <div>
      <Typography variant="h3" align="center" component="h1" className={classes.link} gutterBottom>
        <Box fontWeight="fontWeightBold" letterSpacing={2}>
          Ventas
          <Link to={`${match.url}/new`} className="float-right">
            <Fab size="small" color="primary" aria-label="add"><AddIcon /></Fab>
          </Link>
        </Box>
      </Typography>

      <div className="table-responsive">
      {
        salesList && salesList.length > 0 
        ? (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table1 stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell align="center">
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={18}>Actions</Box>
                      </Typography>
                    </TableCell>                  
                    <TableCell align="center">
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={18}>Id</Box>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={18}>Description</Box>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={18}>State</Box>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={18}>Date</Box>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {salesList.map((sales, i) => (                    
                    <TableRow key={`entity-${i}`} hover role="checkbox" tabIndex={-1}>

                      <TableCell align="center">
                        <IconButton aria-label="findinpage">
                          <Link to={`${match.url}/${sales.id}`} className={classes.link}>
                            <FindInPageIcon fontSize="small" />
                          </Link>                          
                        </IconButton>

                        <IconButton aria-label="edit">
                          <Link to={`${match.url}/${sales.id}/edit`} className={classes.link}>
                            <EditIcon fontSize="small" />                            
                          </Link>                          
                        </IconButton>

                        <IconButton aria-label="delete">
                          <Link to={`${match.url}/${sales.id}/delete`} className={classes.link}>
                            <DeleteIcon fontSize="small" />
                          </Link>                          
                        </IconButton>
                      </TableCell>

                      <TableCell align="center">
                        <Button color="primary">
                          <Link to={`${match.url}/${sales.id}`} className={classes.link}>{sales.id}</Link>
                        </Button>
                      </TableCell>

                      <TableCell align="center">
                        {sales.description}
                      </TableCell>

                      <TableCell align="center">
                        <Translate contentKey={`testApp.State.${sales.state}`} />
                      </TableCell>

                      <TableCell align="center">
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
