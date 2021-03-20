import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import BoundingBoxes from './BoundingBoxes'
import Spinner from './Spinner'

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #1b1b1b;

  .react-transform-component {
    width: 100%;
    height: 100%;
  }
  .react-transform-element {
    width: 100%;
    height: 100%;
  }
  .pinchArea {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .imageFlex {
      display: flex;
      flex-direction: row;
      .imageWrapper {
        max-width: 100%;
        max-height: 100%;
        position: relative;
        cursor: zoom-in;
        img {
          opacity: 0;
          max-width: 100vw;
          max-height: 100vh;
          vertical-align: top;
          transition: opacity 500ms;
        }
        .boundingBoxesContainer {
          opacity: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transition: opacity 2000ms;
        }
      }
    }
  }

  .spinnerWrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const ZoomableImage = ({ url, boxes }) => {
  const [scale, setScale] = useState(1)
  const [loading, setLoading] = useState(true)
  const [displayImage, setDisplayImage] = useState(false)

  const handleImageLoaded = () => {
    if (loading) {
      setLoading(false)
      setTimeout(() => {
        setDisplayImage(true)
      }, 250)
    }
  }

  return (
    <Container>
      <TransformWrapper
        wheel={{
          limitsOnWheel: false,
          step: 75,
        }}
        onPanningStop={({ scale }) => setScale(scale)}
        doubleClick={{
          mode: scale < 5 ? 'zoomIn' : 'reset',
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              <div className="pinchArea">
                <div className="imageFlex">
                  <div className="imageWrapper">
                    <img
                      src={url}
                      alt=""
                      onLoad={handleImageLoaded}
                      style={{ opacity: displayImage ? 1 : 0 }}
                    />
                    {boxes && (
                      <span
                        className="boundingBoxesContainer"
                        style={{ opacity: displayImage ? 1 : 0 }}
                      >
                        <BoundingBoxes boxes={boxes} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {!url ||
        (!displayImage && (
          <div className="spinnerWrapper">
            <Spinner show={loading} />
          </div>
        ))}
    </Container>
  )
}

ZoomableImage.propTypes = {
  url: PropTypes.string,
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      positionX: PropTypes.number,
      positionY: PropTypes.number,
      sizeX: PropTypes.number,
      sizeY: PropTypes.number,
    })
  ),
}

export default ZoomableImage