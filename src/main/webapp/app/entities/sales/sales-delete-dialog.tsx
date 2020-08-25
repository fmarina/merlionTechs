import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISales } from 'app/shared/model/sales.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './sales.reducer';

import {Button, Typography} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export interface ISalesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDeleteDialog = (props: ISalesDeleteDialogProps) => {

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.salesEntity.id);
  };

  const { salesEntity } = props;

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Typography variant="h5" color="primary">
          <Translate contentKey="entity.delete.title" />
        </Typography>
      </ModalHeader>

      <ModalBody id="testApp.sales.delete.question">
        <Typography variant="h6">
          <Translate contentKey="testApp.sales.delete.question" interpolate={{ id: salesEntity.id }} />
        </Typography>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          color="primary"
          endIcon={<DeleteForeverIcon />}
          onClick={confirmDelete}          
        >
          <Translate contentKey="entity.action.delete"/> 
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
  updateSuccess: sales.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDeleteDialog);
