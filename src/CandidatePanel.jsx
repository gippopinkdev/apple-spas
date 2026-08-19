import { useEffect } from "react";
import "./CandidatePanel.css";

const DEFAULT_CANDIDATE_IMAGE = `
  data:image/svg+xml;charset=UTF-8,
  ${encodeURIComponent(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="287 242 761 712"
      width="640"
      height="640"
    >
      <rect
        x="287"
        y="242"
        width="761"
        height="712"
        fill="#f8f9f7"
      />

      <path
        fill="#66736d"
        fill-rule="evenodd"
        d="
          M 307 895
          L 318 907 L 330 914 L 344 916 L 359 911
          L 360 913 L 354 920 L 353 929 L 356 935
          L 364 943 L 382 952 L 402 952 L 414 947
          L 426 938 L 487 873 L 506 859 L 516 854
          L 541 847 L 620 849 L 647 845 L 685 833
          L 707 822 L 725 810 L 755 782 L 771 760
          L 783 738 L 797 702 L 809 677 L 819 663
          L 829 653 L 849 641 L 864 637 L 873 638
          L 855 661 L 843 685 L 837 711 L 837 720
          L 842 723 L 845 721 L 846 704 L 852 683
          L 863 662 L 875 646 L 888 635 L 888 632
          L 921 599 L 943 606 L 969 607 L 987 602
          L 1005 590 L 1004 587 L 998 584 L 978 579
          L 957 580 L 932 590 L 930 588 L 942 573
          L 962 542 L 988 541 L 1007 536 L 1029 523
          L 1041 511 L 1047 502 L 1047 499 L 1039 497
          L 1023 498 L 1008 502 L 989 512 L 969 530
          L 968 529 L 984 490 L 998 475 L 1012 449
          L 1015 436 L 1014 408 L 1012 406 L 1000 416
          L 987 436 L 980 459 L 980 487 L 959 532
          L 958 528 L 961 513 L 959 485 L 948 460
          L 939 450 L 936 452 L 930 475 L 931 495
          L 936 512 L 953 543 L 937 568 L 921 588
          L 922 560 L 917 540 L 906 522 L 901 517
          L 897 519 L 893 535 L 894 557 L 903 580
          L 914 596 L 885 626 L 866 605 L 862 591
          L 856 579 L 845 566 L 838 561 L 821 554
          L 798 553 L 779 558 L 767 564 L 750 576
          L 707 614 L 679 632 L 680 589 L 677 564
          L 666 529 L 650 502 L 632 482 L 613 466
          L 528 410 L 472 365 L 451 345 L 422 313
          L 399 283 L 376 245 L 373 242 L 368 243
          L 358 268 L 355 289 L 355 305 L 361 337
          L 368 356 L 379 377 L 378 378 L 368 371
          L 358 367 L 351 368 L 345 381 L 344 404
          L 349 427 L 356 444 L 371 468 L 386 485
          L 369 484 L 361 488 L 359 492 L 359 508
          L 363 522 L 370 536 L 382 552 L 397 566
          L 409 574 L 399 577 L 394 581 L 393 591
          L 396 601 L 404 615 L 419 631 L 433 641
          L 451 650 L 445 653 L 441 659 L 443 669
          L 451 681 L 466 695 L 480 704 L 499 713
          L 528 722 L 504 738 L 480 750 L 439 765
          L 402 774 L 363 780 L 313 784 L 298 787
          L 292 790 L 287 798 L 287 812 L 292 826
          L 307 842 L 324 847 L 308 856 L 301 865
          L 300 878 Z

          M 372 259
          L 395 294 L 415 320 L 444 352 L 467 374
          L 521 417 L 611 477 L 640 505 L 659 537
          L 668 569 L 670 583 L 670 622 L 666 646
          L 667 648 L 689 638 L 706 627 L 768 575
          L 783 567 L 797 563 L 817 563 L 837 572
          L 851 589 L 859 611 L 873 626 L 872 628
          L 857 629 L 841 634 L 826 643 L 817 651
          L 799 675 L 777 728 L 758 762 L 748 775
          L 727 796 L 703 813 L 674 827 L 656 833
          L 632 838 L 593 840 L 547 837 L 531 839
          L 515 844 L 499 852 L 479 867 L 419 931
          L 408 939 L 397 943 L 387 943 L 374 938
          L 366 932 L 362 924 L 379 904 L 414 869
          L 367 898 L 355 904 L 346 906 L 334 905
          L 325 900 L 313 886 L 310 876 L 310 867
          L 315 862 L 391 826 L 336 838 L 318 837
          L 312 834 L 301 822 L 297 812 L 297 799
          L 301 796 L 311 794 L 351 791 L 401 784
          L 453 771 L 484 759 L 508 747 L 533 731
          L 550 715 L 522 710 L 498 702 L 473 688
          L 456 672 L 451 663 L 453 659 L 472 654
          L 489 652 L 491 650 L 469 646 L 452 640
          L 431 628 L 413 611 L 403 592 L 403 587
          L 405 585 L 414 583 L 450 582 L 416 567
          L 397 553 L 381 535 L 372 518 L 368 503
          L 370 494 L 386 495 L 428 507 L 428 505
          L 401 486 L 381 465 L 367 444 L 356 416
          L 354 405 L 354 386 L 356 378 L 358 377
          L 368 382 L 424 420 L 401 393 L 389 375
          L 371 337 L 365 308 L 365 286 L 368 269 Z
        "
      />

      <!-- Eye -->
      <path
        fill="#66736d"
        d="
          M 813 593
          L 808 597
          L 807 605
          L 811 610
          L 819 611
          L 825 606
          L 825 598
          L 819 593 Z
        "
      />
    </svg>
  `)}
`;

const Icon = ({ children, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

function CloseIcon() {
  return (
    <Icon size={24}>
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </Icon>
  );
}

function TelegramIcon() {
  return (
    <Icon size={19}>
      <path d="M21 4L3.7 10.7c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.4c.2.7.4.7.8.3l2.5-2.5 4.5 3.3c.8.5 1.4.3 1.6-.8L22 5c.2-1-.4-1.4-1-1Z" />
      <path d="m8.1 13.5 9.5-6" />
    </Icon>
  );
}

function VkIcon() {
  return (
    <span className="social-letter" aria-hidden="true">
      VK
    </span>
  );
}

function InstagramIcon() {
  return (
    <Icon size={20}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function YoutubeIcon() {
  return (
    <Icon size={21}>
      <path d="M21 8.2a2.7 2.7 0 0 0-1.9-1.9C17.4 6 12 6 12 6s-5.4 0-7.1.3A2.7 2.7 0 0 0 3 8.2 28 28 0 0 0 2.7 12 28 28 0 0 0 3 15.8a2.7 2.7 0 0 0 1.9 1.9C6.6 18 12 18 12 18s5.4 0 7.1-.3a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .3-3.8 28 28 0 0 0-.3-3.8Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function GlobeIcon() {
  return (
    <Icon size={20}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.5 3.5 5.5 3.5 9s-1.1 6.5-3.5 9c-2.4-2.5-3.5-5.5-3.5-9S9.6 5.5 12 3Z" />
    </Icon>
  );
}

function HeartIcon() {
  return (
    <Icon size={21}>
      <path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
    </Icon>
  );
}

function MegaphoneIcon() {
  return (
    <Icon size={21}>
      <path d="M4 13h3l10 5V6L7 11H4a2 2 0 0 0 0 4Z" />
      <path d="M7 15v4" />
    </Icon>
  );
}

function PeopleIcon() {
  return (
    <Icon size={21}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.2 2.5-5.5 6-5.5s6 2.3 6 5.5" />
      <path d="M16 11c2.7.2 4.5 1.8 5 4" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6" />
    </Icon>
  );
}

function Dove() {
  return (
    <svg
      className="dove-placeholder"
      viewBox="0 0 240 180"
      aria-hidden="true"
    >
      <path
        d="M42 105c35-28 61-44 92-45 26-1 48 10 64 28 9 10 21 17 34 21-17 7-38 10-58 7-30-5-53-19-73-37-13 18-29 32-59 40Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M76 72c17-22 37-37 60-44-8 15-9 29-3 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M174 86c10-8 19-10 29-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="191" cy="79" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function CandidatePanel({
  candidate,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasCandidate = Boolean(candidate?.name);

  return (
    <div className="candidate-panel-root">
      <button
        className="candidate-panel-backdrop"
        onClick={onClose}
        aria-label="Close candidate panel"
      />

      <aside
        className="candidate-panel"
        aria-label={
          hasCandidate
            ? `Candidate ${candidate.name}`
            : "District without candidate"
        }
      >
        <button
          className="candidate-panel-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {hasCandidate ? (
          <CandidateContent candidate={candidate} />
        ) : (
          <EmptyDistrictContent district={candidate?.district} />
        )}
      </aside>
    </div>
  );
}

function CandidateContent({ candidate }) {
  const {
    name,
    district,
    region,
    party,
    photo,
    bio,
    support = [],
    socials = {},
    website,
  } = candidate;

  return (
    <>
      <div className="candidate-top">
        <div className="candidate-badge">Кандидат за мир</div>

        <div className="candidate-header">
          <div className="candidate-photo">
            <img
              src={photo || DEFAULT_CANDIDATE_IMAGE}
              alt={name}
              onError={(event) => {
                event.currentTarget.src = DEFAULT_CANDIDATE_IMAGE;
              }}
            />
          </div>

          <div className="candidate-title">
            <h2>{name}</h2>

            <div className="candidate-district">
              Округ №{district}
            </div>

            <div className="candidate-region">
              {region}
            </div>

            {party && (
              <div className="candidate-party">
                <span className="party-mark">
                  Я
                </span>
                {party}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="candidate-body">
        <Section title="О кандидате">
          <p className="candidate-bio">{bio}</p>
        </Section>

        {support.length > 0 && (
          <Section title="Сейчас нужна поддержка:">
            <div className="support-list">
              {support.includes("share") && (
                <SupportItem
                  icon={<MegaphoneIcon />}
                  text="Распространяйте информацию о кандидате"
                />
              )}

              {support.includes("volunteer") && (
                <SupportItem
                  icon={<PeopleIcon />}
                  text="Помогайте с волонтёрской работой"
                />
              )}

              {support.includes("donate") && (
                <SupportItem
                  icon={<HeartIcon />}
                  text="Поддержите информационно и финансово"
                />
              )}
            </div>
          </Section>
        )}

        <Section title="Ссылки">
          <SocialLinks
            socials={socials}
            website={website}
          />
        </Section>

        <SupportApple />
      </div>
    </>
  );
}

function EmptyDistrictContent({ district }) {
  return (
    <div className="empty-district">
      <div className="candidate-badge">
        Пока без кандидата
      </div>

      <div className="empty-district-visual">
        <Dove />
      </div>

      <div className="empty-district-content">
        <div className="candidate-district">
          Округ №{district || "—"}
        </div>

        <h2>
          В этом округе пока нет
          кандидата за мир.
        </h2>

        <p>
          Поддержите Яблоко, чтобы больше
          людей узнали о партии и
          кандидатах за мир.
        </p>
      </div>

      <SupportApple />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="candidate-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function SupportItem({ icon, text }) {
  return (
    <div className="support-item">
      <div className="support-icon">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function SocialLinks({ socials, website }) {
  const links = [
    {
      key: "telegram",
      href: socials.telegram,
      icon: <TelegramIcon />,
      label: "Telegram",
    },
    {
      key: "vk",
      href: socials.vk,
      icon: <VkIcon />,
      label: "VK",
    },
    {
      key: "instagram",
      href: socials.instagram,
      icon: <InstagramIcon />,
      label: "Instagram",
    },
    {
      key: "youtube",
      href: socials.youtube,
      icon: <YoutubeIcon />,
      label: "YouTube",
    },
  ];

  return (
    <div className="social-links">
      <div className="social-icons">
        {links
          .filter((link) => link.href)
          .map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="social-link"
            >
              {link.icon}
            </a>
          ))}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="candidate-website"
          >
            <GlobeIcon />
            <span>Сайт кандидата</span>
          </a>
        )}
      </div>
    </div>
  );
}

function SupportApple() {
  return (
    <section className="support-apple">
      <div className="support-apple-title">
        Поддержать партию за мир
      </div>

      <p>
        Поддержите партию за мир, чтобы
        больше людей узнали, что они не одни.
      </p>

      {/* <div className="apple-links">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="apple-site-link"
        >
          Сайт партии
          <span>→</span>
        </a>
      </div>
 */}
      <a
        className="telegram-button"
        href="t.me/yabloko_party"
        target="_blank"
        rel="noreferrer"
      >
        <TelegramIcon />
        <span>Подписаться в Telegram</span>
      </a>

    </section>
  );
}