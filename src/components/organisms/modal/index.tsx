import * as React from 'react';
import ReactModal, { Styles } from 'react-modal';

export interface Props {
  isOpen: boolean;
  onCloseClick: () => void;
}

const styles: Styles = {
  content: {
    position: 'absolute',
    display: 'block',
    top: '20%',
    left: '20%',
    width: '60%',
    height: '60%',
    background: '#fff',
    color: '#000',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export class Modal extends React.Component<Props, {}> {
  componentDidMount() {
    if (document) {
      const mountPoint = document.getElementById('mount-point');

      if (mountPoint) {
        ReactModal.setAppElement(mountPoint);
      }
    }
  }

  render() {
    const { isOpen, onCloseClick } = this.props;

    return (
      <ReactModal isOpen={isOpen} style={styles}>
        Modal
        <button type="button" onClick={onCloseClick}>
          ×
        </button>
      </ReactModal>
    );
  }
}
