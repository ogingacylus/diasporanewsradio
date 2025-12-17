"use client";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <div className="flex gap-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
