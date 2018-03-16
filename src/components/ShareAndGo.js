import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  //button
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  // GooglePlusShareButton,
  // LinkedinShareButton,
  // PinterestShareButton,
  // VKShareButton,
  // OKShareButton,
  // RedditShareButton,
  // TumblrShareButton,
  // LivejournalShareButton,

  //icons
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon
  // GooglePlusIcon,
  // LinkedinIcon,
  // PinterestIcon,
  // VKIcon,
  // OKIcon,
  // RedditIcon,
  // TumblrIcon,
  // LivejournalIcon,
  // MailruIcon,
} from "react-share";
import { Link } from "react-router-dom";
import { Input, Segment, Button, Popup } from "semantic-ui-react";
import styled from "styled-components";

const ShareIcons = styled.div`
  display: inline-flex;
`;
const ShareButton = styled.div`
  //   padding: 0 3px 0 3px;
  &:hover {
    cursor: pointer;
  }
`;
const size = 32;
const ShareAndGo = ({ roomId, maxUser, onCopyClick, onPlay }) => {
  const url = `/bingo/${roomId}`;
  const shareLink = `${window.location.host}${url}`;
  const shareItems = [
    {
      name: "WhatsApp",
      content: (
        <WhatsappShareButton
          url={shareLink}
          children={<WhatsappIcon size={size} />}
        />
      )
    },
    {
      name: "Twitter",
      content: (
        <TwitterShareButton
          url={shareLink}
          title={shareLink}
          children={<TwitterIcon size={size} />}
        />
      )
    },
    {
      name: "Facebook",
      content: (
        <FacebookShareButton
          url={shareLink}
          quote={shareLink}
          children={<FacebookIcon size={size} />}
        />
      )
    },

    {
      name: "Telegram",
      content: (
        <TelegramShareButton
          url={shareLink}
          children={<TelegramIcon size={size} />}
        />
      )
    },
    {
      name: "E-mail",
      content: (
        <EmailShareButton
          url={shareLink}
          children={<EmailIcon size={size} />}
        />
      )
    }
  ];
  return (
    <Segment basic textAlign="center">
      <h3>
        <strong>{onPlay ? "Ceated!" : "Share the game!"}</strong>
      </h3>
      <p>
        Share your bingo game with your friends via...<br />
        (Max player: {maxUser} people)
      </p>
      <Input
        id="myInput"
        value={shareLink}
        action={
          <Popup
            on="click"
            trigger={
              <Button color="teal" onClick={onCopyClick} content="Copy" />
            }
            content="Copied!"
          />
        }
      />
      <br />
      <br />
      <ShareIcons>
        {_.map(shareItems, item => {
          return (
            <ShareButton
              key={`share-${item.name}`}
              title={`Share via ${item.name}`}
            >
              {item.content}
            </ShareButton>
          );
        })}
      </ShareIcons>
      <br />
      <br />
      {onPlay ? (
        <Button
          as={Link}
          to={url}
          icon="arrow right"
          labelPosition="right"
          content="Play"
          size="large"
          style={{ backgroundColor: "#84468B", color: "white" }}
        />
      ) : null}
    </Segment>
  );
};

const { number, string, func } = PropTypes;

ShareAndGo.propTypes = {
  maxUser: number.isRequired,
  roomId: string.isRequired,
  onCopyClick: func.isRequired
};
export default ShareAndGo;
