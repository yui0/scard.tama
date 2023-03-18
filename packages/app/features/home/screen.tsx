import {
  Anchor,
  Button,
  H1,
  H5,
  Input,
  Paragraph,
  Separator,
  Sheet,
  SizableText,
  Tabs,
  XStack,
  YStack,
  Image 
} from '@my/ui'
import {
  ChevronDown,
  ChevronUp
} from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'
import _QRCode from 'qrcode'
import { BarCodeScanner } from 'expo-barcode-scanner';

export function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  /*if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }*/


  const linkProps = useLink({
    href: '/user/nate',
  })

  // https://github.com/soldair/node-qrcode
  // https://blog.katsubemakito.net/nodejs/qrcode-generates
  function QRCode(props: QRCodeProps) {
    const [qr, setQR] = useState('');
    const generateQR = async text => {
      try {
        const options = {
          color: {
             dark: '#000',   // QRコード
            light: '#FFF0'   // 背景(透過させる)
          },
          width: 150
        };
        //console.log(await _QRCode.toDataURL(text));
        setQR(await _QRCode.toDataURL(text, options))
        //console.log(await _QRCode.toString(text, {type:'svg'}));
        //setQR(await _QRCode.toString(text, {type:'svg'}));
      } catch (err) {
        console.error(err);
      }
    }
    generateQR(props.value);
    return <Image src={qr} width={150} height={150} />
    //return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M4 4.5h7m2 0h1m1 0h1m2 0h7M4 5.5h1m5 0h1m1 0h1m2 0h2m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m4 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m4 0h1m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h7M4 12.5h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m3 0h1m2 0h1M7 13.5h1m3 0h1m2 0h2m1 0h1m1 0h1m3 0h2M4 14.5h1m2 0h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h4M4 15.5h1m3 0h2m1 0h1m2 0h4m1 0h2m2 0h1M5 16.5h3m2 0h2m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2M12 17.5h2m4 0h1m2 0h2m1 0h1M4 18.5h7m2 0h1m2 0h1m3 0h1m1 0h3M4 19.5h1m5 0h1m2 0h2m3 0h1m4 0h1M4 20.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m1 0h2m1 0h2M4 21.5h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h1M4 22.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h3m2 0h1m1 0h1M4 23.5h1m5 0h1m2 0h1m1 0h3m1 0h3m1 0h1M4 24.5h7m1 0h1m1 0h2m1 0h3m2 0h3"/></svg>
  }

  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      height={150}
      br="$4"
    >
      <Tabs.List disablePassBorderRadius="bottom" aria-label="Manage your account">
        <Tabs.Trigger theme="Button" f={1} value="tab1">
          <SizableText fontFamily="$body">カード</SizableText>
        </Tabs.Trigger>
        <Tabs.Trigger theme="Button" f={1} value="tab2">
          <SizableText fontFamily="$body">クーポン</SizableText>
        </Tabs.Trigger>
        <Tabs.Trigger theme="Button" f={1} value="tab3">
          <SizableText fontFamily="$body">予約</SizableText>
        </Tabs.Trigger>
        <Tabs.Trigger theme="Button" f={1} value="tab4">
          <SizableText fontFamily="$body">お店を探す</SizableText>
        </Tabs.Trigger>
        <Tabs.Trigger theme="Button" f={1} value="tab5">
          <SizableText fontFamily="$body">お店</SizableText>
        </Tabs.Trigger>
        <Tabs.Trigger theme="Button" f={1} value="tab6">
          <SizableText fontFamily="$body">設定</SizableText>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab1">
        <YStack f={1} jc="center" ai="center" p="$4" space>
          <YStack space="$4" maw={600}>
            <H1 ta="center">Welcome to Tamagui.</H1>
            <Paragraph ta="center">
              Here's a basic starter to show navigating from one screen to another. This screen uses the
              same code on Next.js and React Native.
            </Paragraph>

            <Separator />
            <QRCode value="test" />
          </YStack>
          <XStack>
            <Button {...linkProps}>Link to user</Button>
            <Button {...linkProps}>Link to user</Button>
          </XStack>

          <SheetDemo />
        </YStack>
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <H5>Tab 2</H5>
      </Tabs.Content>

      <Tabs.Content value="tab3">
        <H5>Tab 2</H5>
      </Tabs.Content>

      <Tabs.Content value="tab4">
        <H5>Tab 2</H5>
      </Tabs.Content>

      <Tabs.Content value="tab5">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </Tabs.Content>

      <Tabs.Content value="tab6">
        <H5>Tab 2</H5>
      </Tabs.Content>
    </Tabs>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
