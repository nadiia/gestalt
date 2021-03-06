// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupAvatar.css';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Collection from '../Collection/Collection';

const BORDER_WIDTH = 2;

const AVATAR_SIZES = {
  xs: 36,
  sm: 60,
  md: 108,
  lg: 156,
  xl: 198,
};

const DEFAULT_AVATAR_TEXT_SIZES = {
  xs: 20,
  sm: 32,
  md: 56,
  lg: 90,
  xl: 106,
};

type Props = {|
  collaborators: Array<{|
    name: string,
    src?: string,
  |}>,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

const avatarLayout = (n, size) => {
  switch (n) {
    case 1:
      return [{ top: 0, left: 0, width: size, height: size }];
    case 2:
      return [
        {
          top: 0,
          left: 0,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
        {
          top: 0,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
      ];
    default:
      return [
        {
          top: 0,
          left: 0,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
        {
          top: 0,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2,
          height: size / 2 - BORDER_WIDTH / 2,
        },
        {
          top: size / 2 + BORDER_WIDTH / 2,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2,
          height: size / 2 - BORDER_WIDTH / 2,
        },
      ];
  }
};

const degToRad = deg => deg * (Math.PI / 180);

const DefaultAvatar = (props: {
  height: number,
  name: string,
  textLayout: 'center' | 'topLeft' | 'bottomLeft',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}) => {
  const { height, name, textLayout } = props;
  const size = AVATAR_SIZES[props.size];
  const fontSize = DEFAULT_AVATAR_TEXT_SIZES[props.size] / 2;

  const quarterPadding = Math.floor(
    (size / 2 - fontSize) / 2 * Math.sin(degToRad(45))
  );

  const initial = (
    <Text bold color="white">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            fontSize,
            lineHeight: `${fontSize}px`,
          },
        }}
      >
        {[...name][0].toUpperCase()}
      </Box>
    </Text>
  );

  switch (textLayout) {
    case 'bottomLeft':
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="end"
          dangerouslySetInlineStyle={{
            __style: {
              padding: quarterPadding,
            },
          }}
        >
          {initial}
        </Box>
      );
    case 'topLeft':
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="start"
          dangerouslySetInlineStyle={{
            __style: {
              padding: quarterPadding,
            },
          }}
        >
          {initial}
        </Box>
      );
    default:
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {initial}
        </Box>
      );
  }
};

export default function GroupAvatar(props: Props) {
  const { collaborators, size } = props;
  const layout = avatarLayout(collaborators.length, AVATAR_SIZES[size]);
  return (
    <Box
      color="white"
      overflow="hidden"
      shape="circle"
      dangerouslySetInlineStyle={{
        __style: {
          boxShadow: '0 0 0 2px #fff',
          // willChange: transform fixes a strange behavior where the border of the children
          // are not properly trimmed even though overflow: hidden is set
          willChange: 'transform',
        },
      }}
    >
      <Collection
        layout={layout}
        Item={({ idx }) => {
          const { name, src } = collaborators[idx];
          const { width, height } = layout[idx];
          if (!src) {
            return (
              <DefaultAvatar
                name={name}
                textLayout={
                  collaborators.length >= 3
                    ? ['center', 'bottomLeft', 'topLeft'][idx]
                    : 'center'
                }
                height={height}
                size={size}
              />
            );
          }
          return (
            <Box position="relative" width={width} height={height}>
              <Image
                alt={name}
                color="#EFEFEF"
                src={src}
                naturalWidth={1}
                naturalHeight={1}
                fit="cover"
              />
              <div className={styles.wash} />
            </Box>
          );
        }}
      />
    </Box>
  );
}

GroupAvatar.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    })
  ).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};
