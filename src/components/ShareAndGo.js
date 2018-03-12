import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  //button
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton,
  //icons
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  EmailIcon
} from "react-share";
import { Link } from "react-router-dom";
import { Input, Segment, Icon, Button, Popup } from "semantic-ui-react";
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
const ShareAndGo = ({ roomId, maxUser, onCopyClick }) => {
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
        <strong>Created!</strong>
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
      <Button
        basic
        color="pink"
        as={Link}
        to={url}
        icon="arrow right"
        labelPosition="right"
        content="Play"
        size="large"
      />
    </Segment>
  );
};
export default ShareAndGo;
