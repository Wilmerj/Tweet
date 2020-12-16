import React from 'react';
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Collapse
} from "reactstrap";

import retweet from '../../assets/retweet.png';

import indexStyles from './index.module.scss';

export default function view({
  setQuery,
  handleGetTweets,
  listTweets,
  handleToggleCollapse,
  lastTweetRef,
  loading,
  query,
  handleReTweet
}) {
  return (
    <div className={indexStyles.generalContainerHome}>
      <FormGroup row>
        <Label for="tweets" sm={2}>Tweet Search</Label>
        <Col sm={10}>
          <InputGroup>
            <Input value={query} placeholder={'search...'} onChange={e => {
                  if( /[^a-zA-Z0-9\-\/]/.test( e.target.value ) ) {
                    return false;
                }
                setQuery(e.target.value)
            }} />
            <InputGroupAddon addonType="append">
              <Button onClick={handleGetTweets} color="primary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>
      {
        loading ?
          <h6>Cargando...</h6>
          :
          <Row>
            {
              listTweets.length > 0 ?
                listTweets.map((tweet, index) => {
                  if (listTweets.length === index + 1) {
                    return (
                      <Col md={4} key={`tweet_${index}`} style={{ marginBottom: '10px' }} >
                        <div className={indexStyles.targetTweet} ref={lastTweetRef}>
                          <div className={indexStyles.headerTarget}>
                            <img src={tweet.user.profile_image_url_https} />
                            <div>
                              <span className={indexStyles.nameUser}>{tweet.user.name}</span>
                        @{tweet.user.screen_name}
                            </div>
                          </div>
                          <div className={indexStyles.bodyTarget}>
                            <span>
                              {tweet.text.slice(0, 19)}...
                      </span>
                          </div>
                          <div className={indexStyles.footerTarget}>
                          <img src={retweet} alt="retweet" onClick={e => handleReTweet(tweet.text)} />
                    </div>
                          {!tweet.isOpen ? <span onClick={() => handleToggleCollapse(index)} className={indexStyles.more}>Más...</span> : <span onClick={() => handleToggleCollapse(index)} className={indexStyles.more}>Ver menos ^</span>}

                          <Collapse isOpen={tweet.isOpen}>
                            <div className={indexStyles.footerTarget}>
                              {tweet.text}
                            </div>
                          </Collapse>
                        </div>
                      </Col>
                    )
                  } else {
                    return (
                      <Col md={4} key={`tweet_${index}`} style={{ marginBottom: '10px' }}>
                        <div className={indexStyles.targetTweet}>
                          <div className={indexStyles.headerTarget}>
                            <img src={tweet.user.profile_image_url_https} />
                            <div>
                              <span className={indexStyles.nameUser}>{tweet.user.name}</span>
                        @{tweet.user.screen_name}
                            </div>
                          </div>
                          <div className={indexStyles.bodyTarget}>
                            <span>
                              {tweet.text.slice(0, 19)}...
                      </span>
                          </div>
                          <div className={indexStyles.footerTarget}>
                            <img src={retweet} alt="retweet" onClick={e => handleReTweet(tweet.text)} />
                          </div>
                          {!tweet.isOpen ? <span onClick={() => handleToggleCollapse(index)} className={indexStyles.more}>Más...</span> : <span onClick={() => handleToggleCollapse(index)} className={indexStyles.more}>Ver menos ^</span>}

                          <Collapse isOpen={tweet.isOpen}>
                            <div className={indexStyles.footerTarget}>
                              {tweet.text}
                            </div>
                          </Collapse>
                        </div>
                      </Col>
                    )
                  }

                })
                :
                <Col className="text-center mt-5">
                  Esta busqueda no contiene registros
            </Col>
            }
          </Row>
      }
    </div>
  )
}
