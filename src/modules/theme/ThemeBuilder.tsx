const TinyColor = require('tinycolor2');
import {Platform} from 'react-native';

export default class ThemeBuilder {
    static allowShadow(): boolean {
        return !(Platform.OS === 'android' && Platform.Version < 21);
    }

    static build(defaults: ThemeDefaultVars): ThemeVars {
        let allowShadow = this.allowShadow();
        return {
            defaults: defaults,
            darkMode: defaults.darkMode,

            loadingColor: defaults.textColor,

            buttonDefaultIconColor: defaults.textSecondaryColor,
            buttonPrimaryIconColor: defaults.textActiveSecondaryColor,
            buttonDangerIconColor: defaults.textActiveSecondaryColor,
            buttonWarningIconColor: defaults.textActiveSecondaryColor,
            buttonInfoIconColor: defaults.textActiveSecondaryColor,
            buttonSuccessIconColor: defaults.textActiveSecondaryColor,

            buttonDefaultTextColor: defaults.textColor,
            buttonPrimaryTextColor: defaults.textActiveColor,
            buttonDangerTextColor: defaults.textActiveColor,
            buttonWarningTextColor: defaults.textActiveColor,
            buttonInfoTextColor: defaults.textActiveColor,
            buttonSuccessTextColor: defaults.textActiveColor,

            buttonDefaultBackgroundColor: defaults.defaultColor,
            buttonPrimaryBackgroundColor: defaults.primaryColor,
            buttonDangerBackgroundColor: defaults.dangerColor,
            buttonWarningBackgroundColor: defaults.warningColor,
            buttonInfoBackgroundColor: defaults.infoColor,
            buttonSuccessBackgroundColor: defaults.successColor,

            buttonDefaultShadowColor: TinyColor(defaults.defaultColor)
                .darken(4)
                .toHexString(),
            buttonPrimaryShadowColor: TinyColor(defaults.primaryColor)
                .darken(4)
                .toHexString(),
            buttonDangerShadowColor: TinyColor(defaults.dangerColor)
                .darken(4)
                .toHexString(),
            buttonWarningShadowColor: TinyColor(defaults.warningColor)
                .darken(4)
                .toHexString(),
            buttonInfoShadowColor: TinyColor(defaults.infoColor)
                .darken(4)
                .toHexString(),
            buttonSuccessShadowColor: TinyColor(defaults.successColor)
                .darken(4)
                .toHexString(),

            linkTextColor: defaults.primaryColor,
            linkIconColor: defaults.primaryColor,

            inputPlaceholderColor: defaults.textSecondaryColor,
            inputLabelColor: defaults.textSecondaryColor,
            inputBorderColor: defaults.borderColor,
            inputBackgroundColor: TinyColor(defaults.backgroundColor)
                .darken(2)
                .toHexString(),
            inputTextColor: defaults.textColor,

            inputErrorPlaceholderColor: defaults.dangerColor,
            inputErrorLabelColor: defaults.dangerColor,
            inputErrorBorderColor: defaults.dangerColor,
            inputErrorBackgroundColor: TinyColor(defaults.backgroundColor)
                .darken(2)
                .toHexString(),
            inputErrorTextColor: defaults.dangerColor,

            alertMessageDefaultIconColor: defaults.textSecondaryColor,
            alertMessagePrimaryIconColor: defaults.textActiveSecondaryColor,
            alertMessageDangerIconColor: defaults.textActiveSecondaryColor,
            alertMessageWarningIconColor: defaults.textActiveSecondaryColor,
            alertMessageInfoIconColor: defaults.textActiveSecondaryColor,
            alertMessageSuccessIconColor: defaults.textActiveSecondaryColor,

            alertMessageDefaultTitleColor: defaults.textColor,
            alertMessagePrimaryTitleColor: defaults.textActiveColor,
            alertMessageDangerTitleColor: defaults.textActiveColor,
            alertMessageWarningTitleColor: defaults.textActiveColor,
            alertMessageInfoTitleColor: defaults.textActiveColor,
            alertMessageSuccessTitleColor: defaults.textActiveColor,

            alertMessageDefaultTextColor: defaults.textSecondaryColor,
            alertMessagePrimaryTextColor: defaults.textActiveSecondaryColor,
            alertMessageDangerTextColor: defaults.textActiveSecondaryColor,
            alertMessageWarningTextColor: defaults.textActiveSecondaryColor,
            alertMessageInfoTextColor: defaults.textActiveSecondaryColor,
            alertMessageSuccessTextColor: defaults.textActiveSecondaryColor,

            alertMessageDefaultBackgroundColor: defaults.defaultColor,
            alertMessagePrimaryBackgroundColor: defaults.primaryColor,
            alertMessageDangerBackgroundColor: defaults.dangerColor,
            alertMessageWarningBackgroundColor: defaults.warningColor,
            alertMessageInfoBackgroundColor: defaults.infoColor,
            alertMessageSuccessBackgroundColor: defaults.successColor,

            blurImageBackgroundColor: defaults.backgroundDarkenColor,
            blurImageOverlayBackgroundColor: TinyColor(defaults.backgroundDarkenColor)
                .setAlpha(0.3)
                .toRgbString(),

            drawerBackgroundColor: defaults.backgroundColor,
            drawerOverlayBackgroundColor: TinyColor(defaults.backgroundDarkenColor)
                .setAlpha(0.3)
                .toRgbString(),

            drawerContentBackgroundColor: defaults.backgroundSecondaryColor,
            drawerShadowColor: defaults.shadowColor,

            drawerFooterTextColor: defaults.textSecondaryColor,
            drawerFooterIconColor: defaults.textSecondaryColor,
            drawerFooterBorderColor: defaults.borderColor,

            drawerHeaderTextColor: defaults.textColor,
            drawerHeaderBackgroundColor: defaults.backgroundColor,

            drawerItemHeaderTextColor: defaults.textSecondaryColor,
            drawerItemHeaderBorderColor: defaults.borderColor,

            drawerItemTextColor: defaults.textColor,
            drawerItemIconColor: defaults.textSecondaryColor,

            drawerItemActiveTextColor: defaults.textActiveColor,
            drawerItemActiveIconColor: defaults.textActiveSecondaryColor,
            drawerItemActiveBackgroundColor: defaults.primaryColor,

            headerIconColor: defaults.textSecondaryColor,
            headerTextColor: defaults.textColor,
            headerBackgroundColor: defaults.backgroundColor,
            headerShadowColor: defaults.shadowColor,

            headerActionIconColor: defaults.primaryColor,

            modalActionItemBackgroundColor: TinyColor(defaults.backgroundDarkenColor)
                .setAlpha(0.3)
                .toRgbString(),
            modalActionItemBorderColor: defaults.borderColor,
            modalActionItemTextColor: defaults.textColor,
            modalActionItemContentBackgroundColor: defaults.backgroundSecondaryColor,

            modalItemBackgroundColor: TinyColor(defaults.backgroundDarkenColor)
                .setAlpha(0.3)
                .toRgbString(),
            modalItemBorderColor: defaults.borderColor,
            modalItemTextColor: defaults.textColor,
            modalItemContentBackgroundColor: defaults.backgroundColor,

            optionItemBorderColor: defaults.borderColor,
            optionItemIconColor: defaults.textSecondaryColor,
            optionItemTextColor: defaults.textColor,

            progressBarActiveColor: defaults.primaryColor,

            refreshControlTintColor: defaults.primaryColor,
            refreshControlColor: defaults.primaryColor,

            sliderActiveColor: defaults.primaryColor,
            sliderThumbColor: defaults.textActiveSecondaryColor,

            statusBarViewBackgroundIOSColor: TinyColor(defaults.backgroundDarkenColor)
                .setAlpha(0.1)
                .toRgbString(),
            statusBarViewBackgroundAndroidColor: defaults.backgroundDarkenColor,

            switchTintColor: defaults.borderColor,
            switchOnTintColor: defaults.backgroundColor,
            switchThumbTintColor: defaults.primaryColor,

            panelShadowColor: defaults.shadowColor,
            panelIconColor: defaults.textSecondaryColor,
            panelTextColor: defaults.textColor,
            panelBackgroundColor: defaults.backgroundSecondaryColor,

            textColor: defaults.textColor,
            titleColor: defaults.textColor
        };
    }
}

export interface ThemeDefaultVars {
    darkMode: boolean;

    defaultColor: string;
    primaryColor: string;
    dangerColor: string;
    warningColor: string;
    infoColor: string;
    successColor: string;

    textShadowColor: string;
    shadowColor: string;

    textColor: string;
    textSecondaryColor: string;

    textActiveColor: string;
    textActiveSecondaryColor: string;

    backgroundColor: string;
    backgroundSecondaryColor: string;

    backgroundDarkenColor: string;

    borderColor: string;
    borderSecondaryColor: string;
}


export interface ThemeVars {
    defaults: ThemeDefaultVars;
    darkMode: boolean;

    loadingColor: string;

    buttonDefaultIconColor: string;
    buttonPrimaryIconColor: string;
    buttonDangerIconColor: string;
    buttonWarningIconColor: string;
    buttonInfoIconColor: string;
    buttonSuccessIconColor: string;

    buttonDefaultTextColor: string;
    buttonPrimaryTextColor: string;
    buttonDangerTextColor: string;
    buttonWarningTextColor: string;
    buttonInfoTextColor: string;
    buttonSuccessTextColor: string;

    buttonDefaultBackgroundColor: string;
    buttonPrimaryBackgroundColor: string;
    buttonDangerBackgroundColor: string;
    buttonWarningBackgroundColor: string;
    buttonInfoBackgroundColor: string;
    buttonSuccessBackgroundColor: string;

    buttonDefaultShadowColor: string;
    buttonPrimaryShadowColor: string;
    buttonDangerShadowColor: string;
    buttonWarningShadowColor: string;
    buttonInfoShadowColor: string;
    buttonSuccessShadowColor: string;

    linkTextColor: string;
    linkIconColor: string;

    inputPlaceholderColor: string;
    inputLabelColor: string;
    inputBorderColor: string;
    inputBackgroundColor: string;
    inputTextColor: string;

    inputErrorPlaceholderColor: string;
    inputErrorLabelColor: string;
    inputErrorBorderColor: string;
    inputErrorBackgroundColor: string;
    inputErrorTextColor: string;

    alertMessageDefaultIconColor: string;
    alertMessagePrimaryIconColor: string;
    alertMessageDangerIconColor: string;
    alertMessageWarningIconColor: string;
    alertMessageInfoIconColor: string;
    alertMessageSuccessIconColor: string;

    alertMessageDefaultTitleColor: string;
    alertMessagePrimaryTitleColor: string;
    alertMessageDangerTitleColor: string;
    alertMessageWarningTitleColor: string;
    alertMessageInfoTitleColor: string;
    alertMessageSuccessTitleColor: string;

    alertMessageDefaultTextColor: string;
    alertMessagePrimaryTextColor: string;
    alertMessageDangerTextColor: string;
    alertMessageWarningTextColor: string;
    alertMessageInfoTextColor: string;
    alertMessageSuccessTextColor: string;

    alertMessageDefaultBackgroundColor: string;
    alertMessagePrimaryBackgroundColor: string;
    alertMessageDangerBackgroundColor: string;
    alertMessageWarningBackgroundColor: string;
    alertMessageInfoBackgroundColor: string;
    alertMessageSuccessBackgroundColor: string;

    blurImageBackgroundColor: string;
    blurImageOverlayBackgroundColor: string;

    drawerBackgroundColor: string;
    drawerOverlayBackgroundColor: string;

    drawerContentBackgroundColor: string;
    drawerShadowColor: string;

    drawerFooterTextColor: string;
    drawerFooterIconColor: string;
    drawerFooterBorderColor: string;

    drawerHeaderTextColor: string;
    drawerHeaderBackgroundColor: string;

    drawerItemHeaderTextColor: string;
    drawerItemHeaderBorderColor: string;

    drawerItemTextColor: string;
    drawerItemIconColor: string;

    drawerItemActiveTextColor: string;
    drawerItemActiveIconColor: string;
    drawerItemActiveBackgroundColor: string;

    headerIconColor: string;
    headerTextColor: string;
    headerBackgroundColor: string;
    headerShadowColor: string;

    headerActionIconColor: string;

    modalActionItemBackgroundColor: string;
    modalActionItemBorderColor: string;
    modalActionItemTextColor: string;
    modalActionItemContentBackgroundColor: string;

    modalItemBackgroundColor: string;
    modalItemBorderColor: string;
    modalItemTextColor: string;
    modalItemContentBackgroundColor: string;

    optionItemBorderColor: string;
    optionItemIconColor: string;
    optionItemTextColor: string;

    progressBarActiveColor: string;

    refreshControlTintColor: string;
    refreshControlColor: string;

    sliderActiveColor: string;
    sliderThumbColor: string;

    statusBarViewBackgroundIOSColor: string;
    statusBarViewBackgroundAndroidColor: string;

    switchTintColor: string;
    switchOnTintColor: string;
    switchThumbTintColor: string;

    panelShadowColor: string;
    panelIconColor: string;
    panelTextColor: string;
    panelBackgroundColor: string;

    textColor: string;
    titleColor: string;
}